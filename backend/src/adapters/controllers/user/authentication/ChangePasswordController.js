import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class ChangePasswordController {
    constructor(changePasswordUsecase) {
        this._changePasswordUsecase = changePasswordUsecase
    }
    async handleForgetPassword(req, res) {
        try {
            const { email, newPassword } = req.body
            const forgettingPassWord = await this._changePasswordUsecase.ChangePassword({ email, newPassword })
            if (!forgettingPassWord) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: 'error while forget password user' })
                return
            }
            res.status(HttpStatus.OK).json({ message: "password changed" })
        } catch (error) {
            console.log('error while forget password', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while forget password client',
                error: error instanceof Error ? error.message : 'error while forget password client'
            })
        }
    }
}
