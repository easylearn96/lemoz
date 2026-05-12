export class UpdateLastMessageUseCase {

    constructor(
        _chatRepository
    ) {
        this._chatRepository = _chatRepository;
    }

    async updateLastMessage(message) {
        const actualChatId = message.chatId.slice(0,24); 
        message.chatId = actualChatId;
        const result = await this._chatRepository.updateLastMessage(message)
        console.log(result)
        return result
    }
}
