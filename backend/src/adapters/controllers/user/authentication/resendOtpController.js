import { HttpStatus } from "../../../../domain/constants/httpStatus.js"

export class ResendOtpController{
    constructor(ResendOtpUsecase){
        this._ResendOtpUsecase = ResendOtpUsecase
    }

    async resendOpt(req, res) {
        try {
            const { user } = req.body
            await this._ResendOtpUsecase.resendOtp(user?.email)
            res.status(HttpStatus.OK).json({ message: 'OTP sent successfully' })
            return
        } catch (error) {
            console.error('error while sending otp', error)
            res.status(HttpStatus.BAD_REQUEST).json({ message: "error while sending otp test", error: error instanceof Error ? error.message : 'error while sending otp' })
        }
    }
}
