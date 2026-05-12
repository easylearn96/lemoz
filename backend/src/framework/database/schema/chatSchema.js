import { Schema } from "mongoose";

export const chatSchema = new Schema({
    lastMessage: {
        type: String
    },
    lastMessageAt: {
        type: Date
    },
    receiverId: {
        type: String,
        ref: 'user'
    },
    senderId: {
        type: String,
        ref: 'user'
    },
    receiverModel: {
        type: String,
        required: true,
        enum: ['user', 'owner']
    },
    senderModel: {
        type: String,
        required: true,
        enum: ['user', 'owner']
    }
}, {
    timestamps: true
})
