import { HttpStatus } from "../../../domain/constants/httpStatus.js";

export class BlockUserController {
    constructor(userBlockUseCase ) {
        this._userBlockUseCase = userBlockUseCase
    }
    async handleClientBlock(req, res) {
        try {
             const {userId}= req.params
            await this._userBlockUseCase.blockUser({userId})
            res.status(HttpStatus.OK).json({ message: "Client Blocked" })
        } catch (error) {
            console.log('error while blocking user', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while blocking user',
                error: error instanceof Error ? error.message : 'error while blocking user'
            })
        }
    }
}
