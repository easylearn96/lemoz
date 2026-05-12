export class ForgotPasswordUsecase {
     constructor(otpService, emailSevice, userRepository){
        this._otpService = otpService
        this._emailService = emailSevice
        this._userRepository = userRepository
     }

     async execute(input) {
        const { email } = input;
        console.log(email)
        const existingUser = await this._userRepository.findByEmail(email)
        if(!existingUser)throw new Error('user not found with this email')
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
