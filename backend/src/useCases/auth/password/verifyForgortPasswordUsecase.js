export class VerifyForgotPasswordOtpUsecase {
     constructor(otpService, userRepository){
        this._otpService = otpService
        this._userRepository = userRepository
     }

       async verifyOtp(email, enteredOtp) {
           const valideEmail = await this._userRepository.findByEmail(email)
           if(!valideEmail)throw new Error('email is not valide')
          return  this._otpService.verifyOtp(email, enteredOtp)
       }
}
