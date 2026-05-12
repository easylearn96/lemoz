export class GetMessagesUsecase {
    constructor(messageRepository) {
        this._messageRepository = messageRepository;
    }
    
    async getMessages(chatId) {
        return await this._messageRepository.getMessagesOfAChat(chatId);
    }
}
