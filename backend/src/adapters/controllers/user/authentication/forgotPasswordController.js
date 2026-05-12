import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class SendOtpForgotPasswordController {
    constructor(forgotPasswordUsecase) {
        this._forgotPasswordUsecase = forgotPasswordUsecase;
    }

    async handleForgotPassword(req, res) {
        try {
            const { email } = req.body;
            if (!email) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: "Email is required" });
                return;
            }
            await this._forgotPasswordUsecase.execute({email});
            res.status(HttpStatus.OK).json({ message: "Otp sent to your email." });
        } catch (error) {
            console.error("Error in forgot password:", error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: "Failed to send password reset instructions",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }
}
