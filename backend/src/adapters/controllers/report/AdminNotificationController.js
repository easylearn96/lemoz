import { HttpStatus } from "../../../domain/constants/httpStatus.js";

export class AdminNotificationController {
    constructor(_adminNotificationUseCase) {
        this._adminNotificationUseCase = _adminNotificationUseCase
    }

    async sendNotification(req, res) {
        try {
            const { userId, message, type = 'info' } = req.body;

            if (!userId || !message) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "User ID and message are required"
                });
                return;
            }

            const result = await this._adminNotificationUseCase.sendNotificationToUser({
                userId,
                message,
                type
            });

            res.status(HttpStatus.OK).json({
                success: true,
                message: "Notification sent successfully",
                data: {
                    ...result,
                    liveNotificationSent: true
                }
            });
        } catch (error) {
            console.error("Error sending notification:", error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Failed to send notification"
            });
        }
    }
}
