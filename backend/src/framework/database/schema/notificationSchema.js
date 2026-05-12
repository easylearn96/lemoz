import { Schema } from "mongoose";

export const notificationSchema = new Schema({
    from: {
        type: Schema.Types.Mixed, 
        required: true
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    to: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'receiverModel'
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
    },
    type: {
        type: String,
        required: true,
        enum: ['warning', 'info', 'success', 'error']
    }

}, {
    timestamps: true
})
