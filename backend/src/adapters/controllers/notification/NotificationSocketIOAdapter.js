import { getSocketIoServer } from "../../../IO.js";

export class NotificationManagerAdapter {
    constructor(socketIoServer) {
        if (socketIoServer) {
            this.io = socketIoServer
        }
    }
    getSocketIoServer() {
        if (!this.io) {
            try {
                this.io = getSocketIoServer()
            } catch (error) {
                console.warn('Socket.IO server not ready yet, notification will be skipped')
                throw error
            }
        }
        return this.io
    }
    
    async sendLiveNotification(notification) {
        try {
            const socketIoServer = this.getSocketIoServer()
            console.log(socketIoServer.userSockets,'socketIoServer')
            const userSocket = socketIoServer.userSockets.get(notification.to.toString());
            if (userSocket) {
                socketIoServer.getIO().to(userSocket.id).emit('notification', notification);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error'
            console.warn('Failed to send live notification, Socket.IO not ready:', errorMessage)
        }
    }
}
