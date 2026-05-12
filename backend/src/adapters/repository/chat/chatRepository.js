import { chatModel } from "../../../framework/database/models/chatModel.js";

export class ChatRepository {
  async createChat(chat) {
    const createdChat = await chatModel.create(chat);
    return await chatModel.findById(createdChat._id)
      .populate('senderId', 'name profile_image')
      .populate('receiverId', 'name profile_image');
  }

  async getchatOfUser(userId, ownerId) {
    const chat = await chatModel.findOne({
      $or: [
        { senderId: userId,receiverId:ownerId },
        { receiverId: userId,senderId:ownerId }
      ]
    })
    .sort({ lastMessageAt: -1 })
    .populate('senderId', 'name profile_image')
    .populate('receiverId', 'name profile_image');
    
    return chat
  }

  async findChatsOfUser(userId) {
    const result = await chatModel.find({
      $or: [
        { senderId:userId, },
        {receiverId: userId }
      ]
    })
    .sort({ lastMessageAt: -1 })
    .populate('senderId', 'name profile_image')
    .populate('receiverId', 'name profile_image');
    
    return { chats: result }
  }

  async updateLastMessage(message) {
    console.log(message)
    return await chatModel.findByIdAndUpdate(
      message.chatId,
      {
        lastMessage: message.messageContent,
        lastMessageAt: message.sendedTime
      },
      { new: true }
    );
  }
}
