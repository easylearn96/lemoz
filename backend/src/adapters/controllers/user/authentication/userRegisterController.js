import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class UserRegisterController {
    constructor(verifyOtpUsecase,createuserUsecase){
        this._verifyOtpUsecase = verifyOtpUsecase
        this._createuserUsecase = createuserUsecase
    }
     async register(req, res) {
        const { user, otp } = req.body;
        try {
            const verify = await this._verifyOtpUsecase.verifyOtp(user?.email, otp);
            if (verify) {
                const newUser = await this._createuserUsecase.createUser(user);
                res.status(HttpStatus.CREATED).json({ message: 'user created', newUser });
            } else {
                res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid OTP' });
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
