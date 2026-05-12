export class LoadPreviousChatUseCase {
    constructor(messageDatabase) {
        this._messageDatabase = messageDatabase
    }
    async loadPreviousChat(chatId) {
        return await this._messageDatabase.getMessagesOfAChat(chatId)
    }
}
