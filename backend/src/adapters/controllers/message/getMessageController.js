import { HttpStatus } from "../../../domain/constants/httpStatus.js";

export class GetMessageController {
    constructor(getMessagesUsecase) {
        this._getMessagesUsecase = getMessagesUsecase;
    }

    async getMessagesByChatId(req, res) {
        try {
            const { chatId } = req.params;
            
            if (!chatId) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "Chat ID is required"
                });
                return;
            }

            const result = await this._getMessagesUsecase.getMessages(chatId);
            
            res.status(HttpStatus.OK).json({
                success: true,
                data: result
            });
        } catch (error) {
            console.error("Error getting messages:", error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Failed to get messages"
            });
        }
    }
}
