export class SendOtpUserUsecase {
     constructor(otpService, emailSevice, userRepository){
        this._otpService = otpService
        this._emailService = emailSevice
        this._userRepository = userRepository
     }

     async execute(input) {
        const { email } = input;
        const existingUser = await this._userRepository.findByEmail(email)
        if(existingUser)throw new Error('user already exist')
        const otp = this._otpService.genarateOtp()
         console.log(otp)
        await this._otpService.storeOtp(email,otp)
        await this._emailService.sendOtp(email,otp)
        
        return {
            success: true,
            message: 'OTP sent successfully to your email'
        };
     }
}
