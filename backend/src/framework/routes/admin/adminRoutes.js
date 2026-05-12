import { Router } from "express";
import { adminLoginController, ApprovedVehiceController, blockUserController, getAllUserController, getBookingController, getIdProofController, getAdminWalletController, idProofActionController, pendingVehicleController, searchUserController, unblockUserController, vehicleUpproveController, vendorAccessController, dashboardController, adminReportQueryController, adminReportManagementController, adminNotificationController } from "../../DI/adminInject.js";
import { injectedVerfyToken, tokenTimeExpiryValidationMiddleware } from "../../DI/serviceInject.js";
import { checkRoleBaseMiddleware } from "../../../adapters/middlewares/checkRoleBasedMIddleware.js";
export class AdminRoutes {
    constructor() {
        this.AdminRoute = Router()
        this.setRoutes()
    }
    setRoutes() {
        this.AdminRoute.post('/login', (req, res) => {
            adminLoginController.handleAdminLogin(req, res)
        })
        //========MIDDLEWARE==========
        this.AdminRoute.use(injectedVerfyToken,tokenTimeExpiryValidationMiddleware,checkRoleBaseMiddleware('admin'))
       
        this.AdminRoute.get('/getusers', (req, res) => {
            getAllUserController.getAllUsers(req, res)
        })
        this.AdminRoute.patch('/userblock/:userId', (req, res) => {
            blockUserController.handleClientBlock(req, res)
        })
        this.AdminRoute.patch('/unuserblock/:userId', (req, res) => {
            unblockUserController.handleClientBlock(req, res)
        })
        this.AdminRoute.get('/searchuser', (req, res) => {
            searchUserController.searchUser(req, res)
        })
        this.AdminRoute.get('/pending-vehicle', (req, res) => {
            pendingVehicleController.approveVehicle(req, res)
        })
        this.AdminRoute.get('/aproved-vehicle', (req, res) => {
            ApprovedVehiceController.approveVehicle(req, res)
        })
        this.AdminRoute.post('/vehicle-action/:id', (req, res) => {
            vehicleUpproveController.approveVehicle(req, res)
        })
        this.AdminRoute.post('/get-idproof', (req, res) => {
            getIdProofController.getIdProof(req,res)
        })
        this.AdminRoute.post('/idproof-action/:id', (req,res)=>{
           idProofActionController.idProofAction(req,res)
        })
        this.AdminRoute.patch('/vendor-access/:userId', (req,res)=>{
           vendorAccessController.handleVendorAccess(req,res)
         })
        this.AdminRoute.post('/bookings', (req,res)=>{
           getBookingController.getBookingData(req,res)
        })
        this.AdminRoute.get('/get-wallet', (req,res)=>{
           getAdminWalletController.getWalletDetails(req,res)
        })

        // Dashboard Routes
        this.AdminRoute.get('/dashboard/revenue', (req, res) => {
            dashboardController.getTotalRevenue(req, res)
        })
        this.AdminRoute.get('/dashboard/bookings', (req, res) => {
            dashboardController.getTotalBookings(req, res)
        })
        this.AdminRoute.get('/dashboard/users', (req, res) => {
            dashboardController.getTotalUsers(req, res)
        })
        this.AdminRoute.get('/dashboard/vehicles', (req, res) => {
            dashboardController.getActiveVehicles(req, res)
        })
        this.AdminRoute.get('/dashboard/financial-overview', (req, res) => {
            dashboardController.getFinancialOverview(req, res)
        })
        this.AdminRoute.get('/dashboard/user-management', (req, res) => {
            dashboardController.getUserManagementStats(req, res)
        })
        this.AdminRoute.get('/dashboard/vehicle-management', (req, res) => {
            dashboardController.getVehicleManagementStats(req, res)
        })
        this.AdminRoute.get('/dashboard/booking-analytics', (req, res) => {
            dashboardController.getBookingAnalytics(req, res)
        })

        // Report Query Routes (Read Operations)
        this.AdminRoute.get('/reports/all', (req, res) => {
            adminReportQueryController.getAllReports(req, res)
        })
        this.AdminRoute.get('/reports/stats', (req, res) => {
            adminReportQueryController.getReportsStats(req, res)
        })
        this.AdminRoute.get('/reports/:reportId', (req, res) => {
            adminReportQueryController.getReportById(req, res)
        })
        
        // Report Management Routes (Write Operations)
        this.AdminRoute.patch('/reports/:reportId/status', (req, res) => {
            adminReportManagementController.updateReportStatus(req, res)
        })
        
        // Admin Notification Routes
        this.AdminRoute.post('/send-notification', (req, res) => {
            adminNotificationController.sendNotification(req, res)
        })
    }
}
