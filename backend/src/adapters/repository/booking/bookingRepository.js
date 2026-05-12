import mongoose, { isValidObjectId, Types } from "mongoose";
import { BookingStatus } from "../../../domain/entities/BookingEntities.js";
import { bookingModel } from "../../../framework/database/models/bookingModel.js";
import { BaseRepository } from "../base/BaseRepo.js";

export class BookingRepository extends BaseRepository {
     constructor() {
          super(bookingModel);
     }

     //   Creates base aggregation pipeline with user and vehicle lookups

     createBaseAggregationPipeline() {
          return [

               {
                    $lookup: {
                         from: "users",
                         localField: "user_id",
                         foreignField: "_id",
                         as: "user",
                         pipeline: [
                              {
                                   $project: {
                                        _id: 1,
                                        name: 1,
                                        email: 1,
                                        phone: 1,
                                        profile_image: 1
                                   }
                              }
                         ]
                    }
               },
               { $unwind: "$user" },
               {
                    $lookup: {
                         from: "vehicles",
                         localField: "vehicle_id",
                         foreignField: "_id",
                         as: "vehicle"
                    }
               },
               { $unwind: "$vehicle" }
          ];
     }

     /**
      * Creates vehicle aggregation pipeline with location lookup
      */
     createVehicleAggregationPipeline() {
          return [
               {
                    $lookup: {
                         from: "vehicles",
                         localField: "vehicle_id",
                         foreignField: "_id",
                         as: "vehicle"
                    }
               },
               { $unwind: "$vehicle" },
               {
                    $lookup: {
                         from: "locations",
                         localField: "vehicle.location_id",
                         foreignField: "_id",
                         as: "location"
                    }
               },
               { $unwind: "$location" }
          ];
     }

     /**
      * Executes aggregation pipeline and returns paginated results with total count
      */
     async executeAggregationWithCount(
          matchStage,
          limit,
          page,
          additionalPipelineStages = []
     ) {
          const skip = (page - 1) * limit;
          const basePipeline = this.createBaseAggregationPipeline();

          // Pipeline for paginated results
          const dataPipeline = [
               ...basePipeline,
               ...additionalPipelineStages,
               { $match: matchStage },
               { $skip: skip },
               { $limit: limit },
               { $sort: { 'createdAt': -1 } }
          ];

          // Pipeline for total count
          const countPipeline = [
               ...basePipeline,
               ...additionalPipelineStages,
               { $match: matchStage },
               { $count: "total" }
          ];

          const [bookings, totalCount] = await Promise.all([
               bookingModel.aggregate(dataPipeline),
               bookingModel.aggregate(countPipeline)
          ]);

          const total = totalCount[0]?.total || 0;
          return { bookings, total };
     }

     /**
      * Executes vehicle-based aggregation pipeline and returns paginated results with total count
      */
     async executeVehicleAggregationWithCount(
          matchStage,
          limit,
          page
     ) {
          const skip = (page - 1) * limit;
          const basePipeline = this.createVehicleAggregationPipeline();

          // Pipeline for paginated results
          const dataPipeline = [
               ...basePipeline,
               { $match: matchStage },
               { $skip: skip },
               { $limit: limit },
               { $sort: { 'createdAt': -1 } }
          ];

          // Pipeline for total count
          const countPipeline = [
               ...basePipeline,
               { $match: matchStage },
               { $count: "total" }
          ];

          const [bookings, totalCount] = await Promise.all([
               bookingModel.aggregate(dataPipeline),
               bookingModel.aggregate(countPipeline)
          ]);

          const total = totalCount[0]?.total || 0;
          return { bookings, total };
     }

     async findByPaymentIntentId(payment_intent_id) {
          return await bookingModel.findOne({ payment_intent_id })
     }

     async findByUserId(user_id, limit, page, search, status) {
          // Create the match condition
          const match = {
               user_id: new mongoose.Types.ObjectId(user_id),
               "vehicle.name": { $regex: search, $options: "i" }
          };

          if (status !== "all") {
               match.status = status;
          }

          return await this.executeVehicleAggregationWithCount(match, limit, page);
     }
     async getBookingData(search, limit, page) {
          const matchConditions = [
                    { "user.name": { $regex: search, $options: "i" } },
                    { "vehicle.name": { $regex: search, $options: "i" } },
                    { "vehicle.brand": { $regex: search, $options: "i" } },
                    { "booking_id": { $regex: search, $options: "i" } }
               ];

          if (isValidObjectId(search)) {
               matchConditions.push({ _id: new Types.ObjectId(search) });
          }

          const matchStage = { $or: matchConditions };
          return await this.executeAggregationWithCount(matchStage, limit, page);
     }

     async bookedVehicle(pickupDate, returnDate) {
          const pickup = new Date(pickupDate);
          const returnD = new Date(returnDate);
          const bookings = await bookingModel.find({
               status: { $in: ['booked'] },
               $or: [
                    {
                         start_date: { $lt: returnD },
                         end_date: { $gt: pickup }
                    }
               ]
          });

          const vehicleIds = bookings.map(b => b.vehicle_id.toString());
          return [...new Set(vehicleIds)];
     }

     async getBookedBookingsByVehicleId(vehicle_id) {
          return await bookingModel.find({
               vehicle_id,
               status: BookingStatus.booked,
               payment_status: "paid",
          });
     }


     async changeBookingStatus(booking_id, status) {
          return await bookingModel.findOneAndUpdate({ booking_id }, { status }, { new: true })
     }

     async getOwnerBookings(userId, limit, page, search, status) {
          const match = {
               "vehicle.owner_id": new mongoose.Types.ObjectId(userId)
          };

          if (search && search.trim() !== '') {
               match["vehicle.name"] = { $regex: search, $options: "i" };
          }

          if (status !== "all") {
               match.status = status;
          }


          // Create the location lookup pipeline stage to replicate what executeVehicleAggregationWithCount did
          const locationLookupPipeline = [
               {
                    $lookup: {
                         from: "locations",
                         localField: "vehicle.location_id",
                         foreignField: "_id",
                         as: "location"
                    }
               },
               { $unwind: "$location" }
          ];

          return await this.executeAggregationWithCount(match, limit, page, locationLookupPipeline);
     }
     async cancelBooking(booking_id, reason, financeUpdate) {
          const updateData = {
               status: "cancelled",
               cancellation_reason: reason
          };

          if (financeUpdate) {
               updateData.finance = financeUpdate;
          }

          await bookingModel.findOneAndUpdate({booking_id}, updateData);
          return true;
     }

     async endRide(booking) {
          return await bookingModel.findOneAndUpdate(
               { booking_id: booking.booking_id },
               {
                    ride_end_time: booking.ride_end_time,
                    status: BookingStatus.Completed,
                    finance: booking.finance
               },
               { new: true }
          );
     }

     async updateBookingFinance(booking_id, updateData) {
          return await bookingModel.findOneAndUpdate(
               { booking_id },
               { $set: updateData },
               { new: true }
          );
     }

     async findByBookingId(booking_id) {
          return await bookingModel.findOne({booking_id})
     }


     async checkBookingExistsBetweenUserAndOwner(userId, ownerId) {
          try {
               const booking = await bookingModel.findOne({
                    user_id: new Types.ObjectId(userId),
                    owner_id: new Types.ObjectId(ownerId),
                    booking_status: { $in: [BookingStatus.booked, BookingStatus.ongoing] }
               });
               return booking;
          } catch (error) {
               console.error("Error checking booking between user and owner:", error);
               return null;
          }
     }

     // Dashboard Analytics Methods
     async getTotalRevenue() {
          const result = await bookingModel.aggregate([
               { $match: { status: BookingStatus.Completed } },
               { $group: { _id: null, total: { $sum: "$total_amount" } } }
          ]);
          return result[0]?.total || 0;
     }

     async getLastMonthRevenue() {
          const lastMonth = new Date();
          lastMonth.setMonth(lastMonth.getMonth() - 1);

          const result = await bookingModel.aggregate([
               {
                    $match: {
                         status: BookingStatus.Completed,
                         createdAt: { $gte: lastMonth }
                    }
               },
               { $group: { _id: null, total: { $sum: "$total_amount" } } }
          ]);
          return result[0]?.total || 0;
     }

     async getRevenueChartData() {
          const last7Days = Array.from({ length: 7 }, (_, i) => {
               const date = new Date();
               date.setDate(date.getDate() - i);
               return date;
          }).reverse();

          const chartData = await Promise.all(
               last7Days.map(async (date) => {
                    const startOfDay = new Date(date);
                    startOfDay.setHours(0, 0, 0, 0);
                    const endOfDay = new Date(date);
                    endOfDay.setHours(23, 59, 59, 999);

                    const result = await bookingModel.aggregate([
                         {
                              $match: {
                                   status: BookingStatus.Completed,
                                   createdAt: { $gte: startOfDay, $lte: endOfDay }
                              }
                         },
                         { $group: { _id: null, total: { $sum: "$total_amount" } } }
                    ]);
                    return result[0]?.total || 0;
               })
          );
          return chartData;
     }

     async getTotalBookingsCount() {
          return await bookingModel.countDocuments();
     }

     async getLastMonthBookingsCount() {
          const lastMonth = new Date();
          lastMonth.setMonth(lastMonth.getMonth() - 1);

          return await bookingModel.countDocuments({
               createdAt: { $gte: lastMonth }
          });
     }

     async getBookingsChartData() {
          const last7Days = Array.from({ length: 7 }, (_, i) => {
               const date = new Date();
               date.setDate(date.getDate() - i);
               return date;
          }).reverse();

          const chartData = await Promise.all(
               last7Days.map(async (date) => {
                    const startOfDay = new Date(date);
                    startOfDay.setHours(0, 0, 0, 0);
                    const endOfDay = new Date(date);
                    endOfDay.setHours(23, 59, 59, 999);

                    return await bookingModel.countDocuments({
                         createdAt: { $gte: startOfDay, $lte: endOfDay }
                    });
               })
          );
          return chartData;
     }

     async getTotalCommission() {
          const result = await bookingModel.aggregate([
               { $match: { status: BookingStatus.Completed } },
               { $group: { _id: null, total: { $sum: "$finance.admin_commission" } } }
          ]);
          return result[0]?.total || 0;
     }

     async getTotalPenalties() {
          const result = await bookingModel.aggregate([
               { $match: { status: { $in: [BookingStatus.Completed, BookingStatus.Cancelled] } } },
               { $group: { _id: null, total: { $sum: "$finance.fine_amount" } } }
          ]);
          return result[0]?.total || 0;
     }

     async getTotalRefunds() {
          const result = await bookingModel.aggregate([
               { $match: { status: BookingStatus.Cancelled } },
               { $group: { _id: null, total: { $sum: "$refund_amount" } } }
          ]);
          return result[0]?.total || 0;
     }

     async getAverageRevenuePerBooking() {
          const result = await bookingModel.aggregate([
               { $match: { status: BookingStatus.Completed } },
               { $group: { _id: null, avg: { $avg: "$total_amount" } } }
          ]);
          return Math.round(result[0]?.avg || 0);
     }

     async getWeeklyBookingData() {
          const last7Days = Array.from({ length: 7 }, (_, i) => {
               const date = new Date();
               date.setDate(date.getDate() - i);
               return date;
          }).reverse();

          const weeklyData = await Promise.all(
               last7Days.map(async (date) => {
                    const startOfDay = new Date(date);
                    startOfDay.setHours(0, 0, 0, 0);
                    const endOfDay = new Date(date);
                    endOfDay.setHours(23, 59, 59, 999);

                    const bookings = await bookingModel.countDocuments({
                         createdAt: { $gte: startOfDay, $lte: endOfDay }
                    });

                    return {
                         day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                         bookings
                    };
               })
          );
          return weeklyData;
     }

     async getActiveCitiesCount() {
          const result = await bookingModel.distinct('city', {
               status: { $in: [BookingStatus.Completed, BookingStatus.ongoing, BookingStatus.booked] }
          });
          return result.length;
     }

     async getTopCityByBookings() {
          const result = await bookingModel.aggregate([
               { $match: { status: { $ne: BookingStatus.Cancelled } } },
               { $group: { _id: "$city", count: { $sum: 1 } } },
               { $sort: { count: -1 } },
               { $limit: 1 }
          ]);

          return {
               name: result[0]?._id || "No data",
               bookings: result[0]?.count || 0
          };
     }
}
