import { notificationModel } from "../../../framework/database/models/notificationModel.js";
import { BaseRepository } from "../base/BaseRepo.js";
import { Types } from "mongoose";

export class NotificationRepository extends BaseRepository {
    constructor() {
        super(notificationModel)
    }

    async findByUserId(userId) {
        return await notificationModel.aggregate([
            {
                $match: {
                    to: new Types.ObjectId(userId)
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $addFields: {
                    fromObjId: {
                        $toObjectId: "$from"
                    }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "fromObjId",
                    foreignField: "_id",
                    as: "from"
                }
            },
            {
                $unwind: {
                    path: "$from",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    from: {
                        _id: 1,
                        name: 1,
                        email: 1,
                        profile_image: 1
                     },
                    message: 1,
                    read: 1,
                    to: 1,
                    senderModel: 1,
                    receiverModel: 1,
                    type: 1,
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        ])
    }

    async markAsRead(id) {
        return await notificationModel.findByIdAndUpdate(id, { read: true }, { new: true }).populate('from')
    }

    async markAllAsRead(userId) {
        const result = await notificationModel.updateMany(
            { to: userId, read: false }, { read: true })
        return { modifiedCount: result.modifiedCount };
    }

    async getUnreadCount(userId) {
        return await notificationModel.countDocuments({ to: userId, read: false });
    }

    async deleteNotification(id) {
        const result = await notificationModel.deleteOne({ _id: id });
        return { deletedCount: result.deletedCount };
    }

    async deleteAllNotifications(userId) {
        const result = await notificationModel.deleteMany({ to: userId });
        return { deletedCount: result.deletedCount };
    }
}
