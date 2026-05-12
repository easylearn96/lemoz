export class GetNotificationUsecase {
    constructor(_notificationRepository) {
        this._notificationRepository = _notificationRepository;
    }

    mapToNotificationDto(notification) {
        // Handle both string (Admin) and ObjectId (User) cases for 'from' field
        let fromData;
        if (typeof notification.from === 'string') {
            // Admin notification case
            fromData = {
                _id: notification.from,
                name: notification.from === 'Admin' ? 'RYDIO Admin' : notification.from,
                profileImage: ''
            };
        } else if (notification.from && notification.from._id) {
            // User notification case (populated ObjectId)
            fromData = {
                _id: notification.from._id.toString(),
                name: notification.from.name,
                profileImage: notification.from.profile_image || notification.from.profileImage || ''
            };
        } else {
            // Fallback case
            fromData = {
                _id: 'unknown',
                name: 'Unknown Sender',
                profileImage: ''
            };
        }

        return {
            _id: notification._id.toString(),
            from: fromData,
            message: notification.message,
            read: notification.read,
            senderModel: notification.senderModel,
            receiverModel: notification.receiverModel,
            createdAt: notification.createdAt,
            updatedAt: notification.updatedAt
        };
    }

    async getNotificationsByUserId(userId) {
        const notifications = await this._notificationRepository.findByUserId(userId);
        return notifications.map(notification => this.mapToNotificationDto(notification));
    }

    async markNotificationAsRead(notificationId) {
        const notification = await this._notificationRepository.markAsRead(notificationId);
        return notification ? this.mapToNotificationDto(notification) : null;
    }

    async markAllNotificationsAsRead(userId) {
        const result = await this._notificationRepository.markAllAsRead(userId);
        return { modifiedCount: result.modifiedCount };
    }

    async getUnreadNotificationCount(userId) {
        const count = await this._notificationRepository.getUnreadCount(userId);
        return { unreadCount: count };
    }

    async deleteNotification(notificationId) {
        const result = await this._notificationRepository.deleteNotification(notificationId);
        return { deletedCount: result.deletedCount };
    }

    async deleteAllNotifications(userId) {
        const result = await this._notificationRepository.deleteAllNotifications(userId);
        return { deletedCount: result.deletedCount };
    }
}
