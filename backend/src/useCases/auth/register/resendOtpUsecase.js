export class ResendOtpUsecase {
    constructor(otpSevice, emailService){
        this._otpService = otpSevice
        this._emailService = emailService
    }

   async resendOtp(email) {
       const otp =  this._otpService.genarateOtp()
       await this._otpService.storeOtp(email,otp)
       await this._emailService.sendOtp(email,otp)
   }
}
