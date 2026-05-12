export class CreateMessageUseCase {
    constructor(messageDatabase) {
        this._messageRepository = messageDatabase
    }
    async createMessage(message) {
        return this._messageRepository.create(message)
    }
}   
