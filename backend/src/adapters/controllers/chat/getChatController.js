import { HttpStatus } from "../../../domain/constants/httpStatus.js";

export class GetChatController {
    constructor(_getChatUsecase) {
        this._getChatUsecase = _getChatUsecase
    }

    async getChatsOfUser(req, res) {
        try {
            const { userId } = req.params;
            const result = await this._getChatUsecase.getchatsOfUser(userId)
            res.status(HttpStatus.OK).json({success: true,data: result});
        } catch (error) {
            console.error("Error getting user chats:", error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Failed to get chats"
            });
        }
    }
}
