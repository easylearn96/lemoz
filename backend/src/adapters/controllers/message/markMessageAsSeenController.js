import { HttpStatus } from "../../../domain/constants/httpStatus.js";

export class MarkMessageAsSeenController {
    constructor(messageRepository) {
        this._messageRepository = messageRepository;
    }

    async markMessageAsSeen(req, res) {
        try {
            const { messageId } = req.params;
            
            if (!messageId) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "Message ID is required"
                });
                return;
            }

            const result = await this._messageRepository.markMessageAsSeen(messageId);
            
            res.status(HttpStatus.OK).json({
                success: true,
                data: result
            });
        } catch (error) {
            console.error("Error marking message as seen:", error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Failed to mark message as seen"
            });
        }
    }

    async markAllMessagesAsSeenInChat(req, res) {
        try {
            const { chatId } = req.params;
            
            if (!chatId) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "Chat ID is required"
                });
                return;
            }

            const result = await this._messageRepository.markAllMessagesAsSeenInChat(chatId);

            res.status(HttpStatus.OK).json({
                success: true,
                data: result
            });
        } catch (error) {
            console.error("Error marking all messages as seen:", error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Failed to mark all messages as seen"
            });
        }
    }
}
