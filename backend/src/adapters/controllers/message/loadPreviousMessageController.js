import { HttpStatus } from "../../../domain/constants/httpStatus.js";

export class LoadPreviousMessageController {
    constructor(loadPreviousChatUseCase) {
        this._loadPreviousChatUseCase = loadPreviousChatUseCase
    }
    async handleLoadPreviousMessage(req, res) {
        try {
            const pageNo = req.query.pageNo
            const chatId = req.query.chatId
            if (!pageNo || !chatId) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: "pageNo or chatId is nott provided" })
                return
            }
            // const page = parseInt(pageNo, 10) || 1
            const { messages } = await this._loadPreviousChatUseCase.loadPreviousChat(chatId)
            res.status(HttpStatus.OK).json({ message: "Previous chat loaded", messages })
        } catch (error) {
            console.log('error while loading previous message of chat', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while loading previous message of chat",
                error: error instanceof Error ? error.message : 'error while loading previous message of chat'
            })
        }
    }
}
