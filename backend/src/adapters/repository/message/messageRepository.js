import { messageModel } from "../../../framework/database/models/messageModal.js"
import { BaseRepository } from "../base/BaseRepo.js"

export class MessageRepository extends BaseRepository {
    constructor() {
        super(messageModel)
    }
    
    async getMessages(senderId) {
        return await messageModel.find({ senderId })
    }
    
    async getMessagesOfAChat(chatId) {
        const messages = await messageModel.find({ chatId })
            .sort({ sendedTime: 1 })
        return { messages}
    }
    
    async markMessageAsSeen(messageId) {
        return await messageModel.findByIdAndUpdate(
            messageId,
            { seen: true },
            { new: true }
        )
    }
    
    async markAllMessagesAsSeenInChat(chatId) {
        const result = await messageModel.updateMany(
            { chatId, seen: false },
            { seen: true }
        )
        return { modifiedCount: result.modifiedCount }
    }
}
