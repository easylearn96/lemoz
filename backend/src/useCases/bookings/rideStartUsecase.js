import { BookingStatus } from "../../domain/entities/BookingEntities.js";

export class RideStartUsecase {    
  constructor(
    _bookingRepository,
    _vehicleRepository
  ) {
    this._bookingRepository = _bookingRepository;
    this._vehicleRepository = _vehicleRepository;
  }

  async rideStart(input, scanner_user_id) {
    const bookingData = await this._bookingRepository.findByBookingId(input.bookingId);
    if (!bookingData) {
      throw new Error("Booking not found");
    }
   
    if (bookingData.status !== BookingStatus.booked) {
      throw new Error("Ride cannot be started. Current status: " + bookingData.status);
    }

    const vehicleData = await this._vehicleRepository.getVehicleDetails(bookingData.vehicle_id.toString());
    if (!vehicleData) {
      throw new Error("Vehicle not found");
    }

    // Extract the actual user ID from the populated owner object or direct ID
    const vehicleOwnerId = typeof vehicleData.owner_id === 'object' && vehicleData.owner_id !== null && '_id' in vehicleData.owner_id
      ? (vehicleData.owner_id)._id.toString()
      : vehicleData.owner_id.toString();
    
    if (vehicleOwnerId !== scanner_user_id) {
      throw new Error("Access denied. Only the vehicle owner can start this ride.");
    }
    const updatedBooking = await this._bookingRepository.changeBookingStatus(input.bookingId, BookingStatus.ongoing);
    
    if (!updatedBooking) {
      throw new Error("Failed to update booking status");
    }

    return {
      success: true,
      message: "Ride started successfully"
    };
  }
}
