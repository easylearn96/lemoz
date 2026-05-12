import { HttpStatus } from "../../../domain/constants/httpStatus.js";

export class GetAllUserController {
    constructor(getAllUserUsecase) {
        this._getAllUserUsecase = getAllUserUsecase
    }

    async getAllUsers(req, res) {
        try {
            const user = await this._getAllUserUsecase.getAllUser()
            res.status(HttpStatus.OK).json({ user, message: 'success' })

        } catch (error) {
            console.log('error while admin login', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while login admin',
                error: error instanceof Error ? error.message : 'error while login admin'
            })
        }
    }
}
