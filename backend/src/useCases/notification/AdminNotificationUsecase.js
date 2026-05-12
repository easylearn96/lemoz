export class AdminNotificationUsecase {
    constructor(
        _createNotificationUseCase
    ) {
        this._createNotificationUseCase = _createNotificationUseCase;
    }

    async sendNotificationToUser(input) {
        const notification = {
            from: "Admin",
            to: input.userId,
            message: input.message,
            read: false,
            senderModel: 'owner',
            receiverModel: 'owner',
            type: input.type
        };

        const result = await this._createNotificationUseCase.createNotification(notification);
        
        return {
            notification: result,
            liveNotificationSent: true // The CreateNotificationUsecase handles live notifications automatically
        };
    }
}
