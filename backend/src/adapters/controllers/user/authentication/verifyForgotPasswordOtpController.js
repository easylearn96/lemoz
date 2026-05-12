import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class VerifyForgotPassowordOtpController {
    constructor(verifyOtpUsecase){
        this._verifyOtpUsecase = verifyOtpUsecase
    }
     async verify(req, res) {

        const { email, otp } = req.body;
        try {
            const verify = await this._verifyOtpUsecase.verifyOtp(email, otp);
            if (verify) {
                res.status(HttpStatus.OK).json({ message: 'OTP verified successfully', data: verify });
            } else {
                res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid or expired OTP' });
            }
        } catch (error) { 
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Error while creating client",
                error: error instanceof Error ? error.message : "Unknown error",
                stack: error instanceof Error ? error.stack : undefined
            });
            console.log(error)
        }
    }
}   
