import { SendOtpController } from "../../adapters/controllers/user/authentication/sendlOtpController.js"
import { UserRegisterController } from "../../adapters/controllers/user/authentication/userRegisterController.js"
import { UserRepository } from "../../adapters/repository/user/userRepository.js"
import { HashPassword } from "../services/hashPassword.js"
import { EmailService } from "../services/emailService.js"
import { OtpService } from "../services/otpService.js"
import { JwtService } from "../services/jwtService.js"
import { UserLoginController } from "../../adapters/controllers/user/authentication/userLoginController.js"
import { ResendOtpController } from "../../adapters/controllers/user/authentication/resendOtpController.js"
import { SendOtpForgotPasswordController } from "../../adapters/controllers/user/authentication/forgotPasswordController.js"
import { VerifyForgotPassowordOtpController } from "../../adapters/controllers/user/authentication/verifyForgotPasswordOtpController.js"
import { ChangePasswordController } from "../../adapters/controllers/user/authentication/ChangePasswordController.js"
import { EditProfileController } from "../../adapters/controllers/user/profile-managment/editProfileController.js"
import { EditProfileUsecase } from "../../useCases/userProfile/editProfileUsecase.js"
import { AddVehicleController } from "../../adapters/controllers/user/vehicle-mangment/addVehicleController.js"
import { AddVehicleUsecase } from "../../useCases/vehicles/addVehicleUseCase.js"
import { VehicleRepository } from "../../adapters/repository/user/vehicleRepository.js"
import { LocationRepository } from "../../adapters/repository/user/LocationRepository.js"
import { ChangePasswordUserController } from "../../adapters/controllers/user/profile-managment/changePasswordController.js"
import { ChangePassword } from "../../useCases/userProfile/ChangePasswordUsecase.js"
import { MyVehicleController } from "../../adapters/controllers/user/vehicle-mangment/MyVehicleController.js"
import { MyVehicleUsecase } from "../../useCases/vehicles/MyvehicleUsecase.js"
import { RedisService } from "../services/redisService.js"
import { UserLogoutController } from "../../adapters/controllers/user/authentication/userLogoutController.js"
import { UploadIdProofController } from "../../adapters/controllers/user/profile-managment/uploadIDProofController.js"
import { UploadIdProofUsecase } from "../../useCases/userProfile/UploadIdProofUsecase.js"
import { UploadIdProofRepository } from "../../adapters/repository/user/UploadIdProofRepository.js"
import { SearchVehicleUsecase } from "../../useCases/vehicles/searchVehicleUsecase.js"
import { SearchVehicleController } from "../../adapters/controllers/user/vehicle-mangment/searchVehicleController.js"
import { VehilceDetailsController } from "../../adapters/controllers/user/vehicle-mangment/vehilceDetailsController.js"
import { VehicleDetailsUsecase } from "../../useCases/vehicles/vehicleDetailsUsecase.js"
import { CreateBookingController } from "../../adapters/controllers/user/booking-managment/createBookingController.js"
import { CreatePaymentIntentController } from "../../adapters/controllers/user/booking-managment/createPaymentIntentController.js"
import { StripeService } from "../services/paymentSerivce.js"
import { MyBookingController } from "../../adapters/controllers/user/booking-managment/myBookingController.js"
import { BookingRepository } from "../../adapters/repository/booking/bookingRepository.js"
import { DeleteVehicleUsecase } from "../../useCases/vehicles/deleteVehicleUsecase.js"
import { DeleteVehicleController } from "../../adapters/controllers/user/vehicle-mangment/deleteVehicleController.js"
import { ChangeVehicleStatusController } from "../../adapters/controllers/user/vehicle-mangment/changeVehicleStatusController.js"
import { GetBookedVehicleController } from "../../adapters/controllers/user/booking-managment/getBookedVehicleController.js"
import { GetUserController } from "../../adapters/controllers/user/profile-managment/getUserController.js"
import { GetUserUsecase} from "../../useCases/userProfile/GetuserUsecase.js"
import { WalletRepository } from "../../adapters/repository/wallet/walletRepository.js"
import { GetWalletController } from "../../adapters/controllers/wallet/getWalletController.js"
import { AdminWalletRepository } from "../../adapters/repository/wallet/adminWalletRepository.js"
import { GetSecurityDepositController } from "../../adapters/controllers/user/booking-managment/getSecurityDepositController.js"
import { TrasationRepository } from "../../adapters/repository/transation/TrasationRepository.js"
import { RideStartController } from "../../adapters/controllers/user/booking-managment/rideStartController.js"
import { RideEndController } from "../../adapters/controllers/user/booking-managment/rideEndController.js"
import { IncomingBookingController } from "../../adapters/controllers/user/booking-managment/incomingBookingController.js"
import { CancelBookingController } from "../../adapters/controllers/user/booking-managment/cancelBookingController.js"
import { SendOtpUserUsecase } from "../../useCases/auth/register/sendOtpuserUsecase.js"
import { VerifyOtpUsecase } from "../../useCases/auth/register/verfyOtpUsecase.js"
import { CreateUserUsecase } from "../../useCases/auth/register/createUserUsecase.js"
import { LoginUserUsecase } from "../../useCases/auth/login/loginUserUsercase.js"
import { GoogleLoginUsecase } from "../../useCases/auth/login/GoogleLoginUsecase.js"
import { ResendOtpUsecase } from "../../useCases/auth/register/resendOtpUsecase.js"
import { ForgotPasswordUsecase } from "../../useCases/auth/password/forgotPasswordOtpUsecase.js"
import { UserLogoutUseCase } from "../../useCases/auth/login/LogoutUserUsecase.js"
import { ChangePasswordUseCase } from "../../useCases/auth/password/ChangePasswordUsecase.js"
import { CreateBookingUsecase } from "../../useCases/bookings/createBookingUsecase.js"
import { CreatePaymentIntentUsecase } from "../../useCases/payments/createPaymentIntentUsecase.js"
import { MyBookingUsecase } from "../../useCases/bookings/myBookingUsecase.js"
import { GetBookedVehicleUsecase } from "../../useCases/bookings/GetBookedVehicleUsecase.js"
import { GetWalletUsecase } from "../../useCases/wallets/getWalletUsecase.js"
import { GetSecurityDepositUsecase } from "../../useCases/bookings/getSecurityDepositUsecase.js"
import { RideStartUsecase } from "../../useCases/bookings/rideStartUsecase.js"
import { RideEndUsecase } from "../../useCases/bookings/rideEndUsecase.js"
import { IncomingBookingUsecase } from "../../useCases/bookings/incomingBookingUsecase.js"
import { CancelBookingUseCase } from "../../useCases/bookings/cancelBookingUseCase.js"
import { WithdrawController } from "../../adapters/controllers/admin/WalletManagment/withdrawController.js"
import { WithdrawUsecase } from "../../useCases/wallets/withdrawUsecase.js"
import { ReapplyVehicleController } from "../../adapters/controllers/user/vehicle-mangment/reapplyVehicleController.js"
import { ReapplyVehicleUsecase } from "../../useCases/vehicles/reapplyVehicleUsecase.js"
import { ChangeVehicleStatusUsecase } from "../../useCases/vehicles/changeVehicleStatusUsecase.js"
import { NotificationRepository } from "../../adapters/repository/notification/notificationRepository.js"
import { GetNotificationUsecase } from "../../useCases/notification/GetNotificationUsecase.js"
import { NotificationController } from "../../adapters/controllers/notification/notificationController.js"
import { ReportRepository } from "../../adapters/repository/report/reportRepository.js"
import { CreateReportUsecase } from "../../useCases/report/CreateReportUsecase.js"
import { UserReportQueryUsecase } from "../../useCases/report/UserReportQueryUsecase.js"
import { CreateReportController } from "../../adapters/controllers/report/CreateReportController.js"
import { GetReportsController } from "../../adapters/controllers/report/GetReportsController.js"

// regester user 
const otpService = new OtpService()
const emailService = new EmailService()
export const userRepository = new UserRepository()
const bookingRepository = new BookingRepository()
const sendOtpUserUsecase = new SendOtpUserUsecase(otpService,emailService,userRepository)
const verifyOtpUsecase = new VerifyOtpUsecase(otpService)
const hashPassword = new HashPassword()
const redisService = new RedisService()
const walletRepository = new WalletRepository()
const adminWalletRepository = new AdminWalletRepository()
const trasationRepository = new TrasationRepository()
const createUserUsecase = new CreateUserUsecase(userRepository,hashPassword,walletRepository)
export const sendendOtpController = new SendOtpController(sendOtpUserUsecase)
export const  userRegisterController = new UserRegisterController(verifyOtpUsecase,createUserUsecase)


//----------login User-----------

const jwtService = new JwtService()
const loginUserUsecase = new LoginUserUsecase(userRepository,hashPassword,walletRepository,jwtService,redisService)
const googleLoginUsecase = new GoogleLoginUsecase(userRepository,walletRepository,jwtService,redisService)


export const userLoginController = new UserLoginController(loginUserUsecase,googleLoginUsecase)

//-----resendOtp ------------
const resendOtpUsecase = new ResendOtpUsecase(otpService,emailService)
export const resendOtpController = new ResendOtpController(resendOtpUsecase)

//------forgotpassword-------
const forgotPasswordUsecase = new ForgotPasswordUsecase(otpService,emailService,userRepository)
export const sendOtpForgotPasswordController = new SendOtpForgotPasswordController(forgotPasswordUsecase)

//------verifyforgotPassword---------
export const verifyForgotPassowordOtpController = new VerifyForgotPassowordOtpController(verifyOtpUsecase)

//--------change-Passoword--------
const changePasswordUsecase = new ChangePasswordUseCase(userRepository,hashPassword)
export const changePasswordController = new ChangePasswordController(changePasswordUsecase)

//-------logout ----------------
const userLogoutUseCase = new UserLogoutUseCase(redisService,jwtService)
export const userlogoutController = new UserLogoutController(userLogoutUseCase)

//-------update profile------------
const editProfileUseCase = new EditProfileUsecase(userRepository)
export const editProfileController = new EditProfileController(editProfileUseCase)


//---------get user details-------------

const getUserUsecase = new GetUserUsecase(userRepository)
export const getUserController = new GetUserController(getUserUsecase)
//------ add vehicle--------------

const vehicleRepository = new VehicleRepository()
const locationRepository = new LocationRepository()
const addVehicleUsecase = new AddVehicleUsecase(vehicleRepository,locationRepository)
export const addVehicleController = new AddVehicleController(addVehicleUsecase)

//-----change password---------

const changePasswordUserUsecase = new ChangePassword(userRepository,hashPassword)
export const changePasswordUserController = new ChangePasswordUserController(changePasswordUserUsecase)

//---get my vehicle---

const myvehicleUsecase = new MyVehicleUsecase(vehicleRepository)
export const myVehicleController = new MyVehicleController(myvehicleUsecase)

//-------search vehicle------------

const searchVehicleUsecase = new SearchVehicleUsecase(vehicleRepository,bookingRepository)
export const searchVehicleController = new SearchVehicleController(searchVehicleUsecase)

//----get vehicle details------

const vehicleDetailsUsecase = new VehicleDetailsUsecase(vehicleRepository)
export const vehicleDetailsController = new VehilceDetailsController(vehicleDetailsUsecase)

//-------upload Id prooof-------------

const uploadIdProofRepository = new UploadIdProofRepository()
const uploadIdProofUsecase = new UploadIdProofUsecase(uploadIdProofRepository)
export const uploadIdProofController = new UploadIdProofController(uploadIdProofUsecase)

//----------create Booking------------
const createBookingUsecase = new CreateBookingUsecase(bookingRepository,redisService,vehicleRepository,adminWalletRepository,walletRepository,trasationRepository)
export const createBookingController = new CreateBookingController(createBookingUsecase)

//--------create payment intent------------
const stripeService = new StripeService()
const createPaymentIntentUsecase = new CreatePaymentIntentUsecase(stripeService,redisService)
export const createPaymentIntentController = new CreatePaymentIntentController(createPaymentIntentUsecase)

const myBookingUsecase = new MyBookingUsecase(bookingRepository)
export const myBookingController = new MyBookingController(myBookingUsecase)


//------delete vehicle---------
const deleteVehicleUsecase = new DeleteVehicleUsecase(vehicleRepository)
export const deleteVehicleController = new DeleteVehicleController(deleteVehicleUsecase)

//------change vehicle status---------
const changeVehicleStatusUsecase = new ChangeVehicleStatusUsecase(vehicleRepository)
export const changeVehicleStatusController = new ChangeVehicleStatusController(changeVehicleStatusUsecase)


//------get booked vehicle details---------

const getBookedVehicleUsecase = new GetBookedVehicleUsecase(bookingRepository)
export const getBookedVehicleController = new GetBookedVehicleController(getBookedVehicleUsecase)

//------get wallet details---------
const getWalletUsecase = new GetWalletUsecase(walletRepository)
export const getWalletController = new GetWalletController(getWalletUsecase)
    
//------get security deposit details---------
const getSecurityDepositUsecase = new GetSecurityDepositUsecase()
export const getSecurityDepositController = new GetSecurityDepositController(getSecurityDepositUsecase)

//------ride start---------
const rideStartUsecase = new RideStartUsecase(bookingRepository,vehicleRepository)
export const rideStartController = new RideStartController(rideStartUsecase)

//------ride end---------
const rideEndUsecase = new RideEndUsecase(bookingRepository,vehicleRepository,adminWalletRepository)
export const rideEndController = new RideEndController(rideEndUsecase)


//------incoming booking---------
const incomingBookingUsecase = new IncomingBookingUsecase(bookingRepository)
export const incomingBookingController = new IncomingBookingController(incomingBookingUsecase)

//------cancel booking---------
const cancelBookingUsecase = new CancelBookingUseCase(bookingRepository,walletRepository,adminWalletRepository,trasationRepository,vehicleRepository)
export const cancelBookingController = new CancelBookingController(cancelBookingUsecase)

//------withdraw-money----------

const withdrawUsecase = new WithdrawUsecase(bookingRepository,vehicleRepository,walletRepository,adminWalletRepository,trasationRepository,)
export const withdrawController = new WithdrawController(withdrawUsecase)

//------reapply vehicle----------
const reapplyVehicleUsecase = new ReapplyVehicleUsecase(vehicleRepository)
export const reapplyVehicleController = new ReapplyVehicleController(reapplyVehicleUsecase)

//------notification----------
const notificationRepository = new NotificationRepository()
const getNotificationUsecase = new GetNotificationUsecase(notificationRepository)
export const notificationController = new NotificationController(getNotificationUsecase)

//------report----------
const reportRepository = new ReportRepository()
const createReportUsecase = new CreateReportUsecase(reportRepository)
// SOLID-compliant: Use UserReportQueryUsecase for user-specific report operations
const userReportQueryUsecase = new UserReportQueryUsecase(reportRepository)
export const createReportController = new CreateReportController(createReportUsecase)
export const getReportsController = new GetReportsController(userReportQueryUsecase)
