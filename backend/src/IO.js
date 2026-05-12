import { Server } from "socket.io"

export class SocketIoServer {
    constructor(server) {
        this.io = server
        this.userSockets = new Map() // userId -> socketId
        this.ChatOnline = new Map() //userId -> roomId
        this.setupSocket()
    }
    getIO() {
        return this.io;
    }

    setupSocket(){
    this.io.on('connect', (socket) => {
            console.log(socket.id, 'socked connected')
            socket.emit('connected', socket.id)
        socket.on('user-online', (userId) => {
            this.userSockets.set(userId, socket);
            socket.broadcast.emit('user-status-changed', { userId, isOnline: true });
          })
        })
        
        this.io.on('disconnect', (socket) => {
            for (const [userId, socketId] of this.userSockets.entries()) {
              if (socketId.id === socket.id) {
                this.userSockets.delete(userId);
                socket.broadcast.emit('user-status-changed', { userId, isOnline: false });
                break;
              }
            }
          })
    } 
}

let socketIOServer
export const createSocketIOServer = (server) => {
    const io = new Server(server, {
                cors: {
                    origin: process.env.ORIGIN,
                    credentials: true
                }
            })

            socketIOServer = new SocketIoServer(io)
            return socketIOServer
}

export const getSocketIoServer = () => {
    if(!socketIOServer){
        throw new Error("IO not found")
    }
    return socketIOServer
}
