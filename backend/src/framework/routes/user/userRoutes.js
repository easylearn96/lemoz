import { Router } from "express";
import { addVehicleController, changePasswordController, changePasswordUserController, changeVehicleStatusController, createBookingController, createPaymentIntentController, deleteVehicleController, editProfileController, getBookedVehicleController, myBookingController, myVehicleController, resendOtpController, vehicleDetailsController, sendendOtpController, sendOtpForgotPasswordController, uploadIdProofController, userLoginController, userlogoutController, userRegisterController, verifyForgotPassowordOtpController, searchVehicleController, getUserController, getWalletController, getSecurityDepositController, rideStartController, rideEndController, incomingBookingController, cancelBookingController, withdrawController, reapplyVehicleController, createReportController, getReportsController } from "../../DI/userInject.js";
import { injectedUserBlockChecker, injectedVerfyToken, tokenTimeExpiryValidationMiddleware } from "../../DI/serviceInject.js";
import { checkRoleBaseMiddleware } from "../../../adapters/middlewares/checkRoleBasedMIddleware.js";

export class UserRoutes {
    constructor() {
        this.UserRoutes = Router();
        this.setRoutes();
}
    setRoutes(){

    this.UserRoutes.get('/',(req,res)=>{
        res.send('your server is running successfully')
    })
    this.UserRoutes.post('/signup', (req, res) => {
       sendendOtpController.sendOtp(req,res)
    })
    this.UserRoutes.post('/verifyotp',(req,res)=>{
       userRegisterController.register(req,res)
    })
    this.UserRoutes.post('/login',(req, res)=>{
        userLoginController.handleLogin(req,res)
    })
    this.UserRoutes.post('/googlelogin',(req, res)=>{
        userLoginController.handleGoogleLogin(req,res)
    })
    this.UserRoutes.post('/resendotp',(req, res)=>{
        resendOtpController.resendOpt(req,res)
    })
    this.UserRoutes.post('/forgotpassword',(req, res)=>{
       sendOtpForgotPasswordController.handleForgotPassword(req,res)
    })
    this.UserRoutes.post('/verifyforgotpasswordotp',(req, res)=>{
       verifyForgotPassowordOtpController.verify(req,res)
    })
    this.UserRoutes.get('/logout',(req, res)=>{
       userlogoutController.handleClientLogout(req,res)
    })
    this.UserRoutes.patch('/changepassword',(req, res)=>{
       changePasswordController.handleForgetPassword(req,res)
    })

 //==========MIDDLEWARE==========
    this .UserRoutes.use(injectedVerfyToken,tokenTimeExpiryValidationMiddleware,checkRoleBaseMiddleware('user'),injectedUserBlockChecker)


    this.UserRoutes.patch('/editProfile',(req,res)=>{
        editProfileController.handleEditProfle(req,res)
    })
    this.UserRoutes.post('/add-vehicle',(req,res)=>{
        addVehicleController.addVehicle(req,res)
    })
    this.UserRoutes.patch('/change-password',(req,res)=>{
      changePasswordUserController.handleEditProfle(req,res)
    })
    this.UserRoutes.get('/get-user/:id',(req,res)=>{
        getUserController.getUser(req,res)
    })
    this.UserRoutes.post('/my-vehicle',(req,res)=>{
      myVehicleController.getMyVehicle(req,res)
    })
    this.UserRoutes.post('/upload-idproof',(req,res)=>{
        uploadIdProofController.uploadIdProof(req,res)
    })
    this.UserRoutes.post('/search-vehicle',(req,res)=>{
        searchVehicleController.searchVehicle(req,res)
    })
    this.UserRoutes.get('/vehicle-details/:id',(req,res)=>{ 
         vehicleDetailsController.getVehicleDetails(req,res)
    })
    this.UserRoutes.post('/create-booking',(req,res)=>{
         createBookingController.createBooking(req,res)
    })
    this.UserRoutes.post('/create-payment-intent',(req,res)=>{
        createPaymentIntentController.createPaymentIntent(req,res)
    })
    this.UserRoutes.post('/my-booking',(req,res)=>{
        myBookingController.myBooking(req,res)
    })
    this.UserRoutes.delete('/vehicle/:vehicleId',(req,res)=>{
        deleteVehicleController.deleteVehicle(req,res)
    })
    this.UserRoutes.patch('/vehicle-status/:vehicleId',(req,res)=>{
        changeVehicleStatusController.changeVehicleStatus(req,res)
    })
    this.UserRoutes.get('/booked-date/:vehicleId',(req,res)=>{
        getBookedVehicleController.getBookedVehicleDetails(req,res)
    })
    this.UserRoutes.get('/security-deposit',(req,res)=>{
        getSecurityDepositController.handleGetSecurityDeposit(req,res)
    })
    this.UserRoutes.post('/incoming-bookings/:userId',(req,res)=>{
        incomingBookingController.getBookingDetails(req,res)
    })
    this.UserRoutes.get('/get-wallet/:userId',(req,res)=>{
        getWalletController.getWalletDetails(req,res)
    })
    this.UserRoutes.get('/ride-start/:bookingId',(req,res)=>{
        rideStartController.handleRideStart(req,res)
    })
    this.UserRoutes.post('/cancel-booking/:bookingId',(req,res)=>{
        cancelBookingController.cancelBooking(req,res)
    })
    this.UserRoutes.get('/ride-end/:bookingId',(req,res)=>{
        rideEndController.handleRideEnd(req,res)
    })
    this.UserRoutes.post('/withdrawal/:bookingId',(req,res)=>{
        withdrawController.withdraw(req,res)
    })
    this.UserRoutes.post('/vehicles/reapply',(req,res)=>{
        reapplyVehicleController.reapplyVehicle(req,res)
    })

    // Report routes
    this.UserRoutes.post('/reports/create',(req,res)=>{
        createReportController.createReport(req,res)
    })
    this.UserRoutes.get('/reports/user/:userId',(req,res)=>{
        getReportsController.getReportsByUser(req,res)
    })
    this.UserRoutes.get('/reports/booking/:bookingId',(req,res)=>{
        getReportsController.getReportsByBooking(req,res)
    })
    }
}
