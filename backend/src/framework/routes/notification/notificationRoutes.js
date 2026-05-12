import { Router } from "express";
import { notificationController } from "../../DI/userInject.js";
import { injectedUserBlockChecker, injectedVerfyToken, tokenTimeExpiryValidationMiddleware } from "../../DI/serviceInject.js";
import { checkRoleBaseMiddleware } from "../../../adapters/middlewares/checkRoleBasedMIddleware.js";

export class NotificationRoutes {
    constructor() {
        this.NotificationRoutes = Router();
        this.setRoutes();
    }
    setRoutes() {

        this.NotificationRoutes.use(injectedVerfyToken,tokenTimeExpiryValidationMiddleware,checkRoleBaseMiddleware('user'),injectedUserBlockChecker)

        this.NotificationRoutes.get('/:userId', (req, res) => {
            notificationController.getUserNotifications(req, res)

        });
        this.NotificationRoutes.patch('/:notificationId/read', (req, res) => {
            notificationController.markNotificationAsRead(req, res)
        });
        this.NotificationRoutes.patch('/mark-all-read/:userId', (req, res) => {
            notificationController.markAllNotificationsAsRead(req, res)
        });
        this.NotificationRoutes.get('/unread-count/:userId', (req, res) => {
            notificationController.getUnreadCount(req, res)
        });
        this.NotificationRoutes.delete('/:notificationId', (req, res) => {
            notificationController.deleteNotification(req, res)
        });
        this.NotificationRoutes.delete('/delete-all/:userId', (req, res) => {
            notificationController.deleteAllNotifications(req, res)
        });
    }

}
