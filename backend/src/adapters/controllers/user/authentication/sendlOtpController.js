import { HttpStatus } from "../../../../domain/constants/httpStatus.js";
export class SendOtpController{
    constructor(userSendOtpUsecase){
        this._userSendOtpUsecase = userSendOtpUsecase
    }

    async sendOtp(req, res) {
        try {
            const {user} = req.body
            await this._userSendOtpUsecase.execute({email:user?.email})
            res.status(HttpStatus.OK).json({message:'OTP sended successfully'})
            return
        } catch (error) {
            console.error('error while sending otp',error)
            res.status(HttpStatus.BAD_REQUEST).json({message:"error while sending otp test",error:error instanceof Error ? error.message: 'error while sending otp'})
        }
    }
}
