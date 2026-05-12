export class VerifyOtpUsecase {
    constructor(otpSevice){
        this._otpService = otpSevice
    }

    async verifyOtp(email, enteredOtp) {
        return this._otpService.verifyOtp(email,enteredOtp)
    }
}
