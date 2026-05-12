import { AdminLoginController } from "../../adapters/controllers/admin/AdminLoginController.js";
import { BlockUserController } from "../../adapters/controllers/admin/BlockUsersController.js";
import { GetBookingController } from "../../adapters/controllers/admin/bookingMangment/GetBookingController.js";
import { GetAllUserController } from "../../adapters/controllers/admin/GetAllUserController.js";
import { GetIdProofController } from "../../adapters/controllers/admin/getIdproofController.js";
import { IdProofActionController } from "../../adapters/controllers/admin/idProofActionController.js";
import { SearchUserController } from "../../adapters/controllers/admin/SearchUserController.js";
import { UnblockUserController } from "../../adapters/controllers/admin/UnblockUserController.js";
import { GetApprovedVehicleController } from "../../adapters/controllers/admin/vehicleManagment/getApproveVehicleContorller.js";
import { PendingVehicleController } from "../../adapters/controllers/admin/vehicleManagment/PendingVehilcleContorller.js";
import { VehicleUpproveController } from "../../adapters/controllers/admin/vehicleManagment/VehicleUpproveController.js";
import { VendorAccessController } from "../../adapters/controllers/admin/vendorAccessController.js";
import { AdminRepository } from "../../adapters/repository/admin/adminRepository.js";
import { BookingRepository } from "../../adapters/repository/booking/bookingRepository.js";
import { VehicleRepository } from "../../adapters/repository/user/vehicleRepository.js";
import { LoginAdminUsecase } from "../../useCases/admin/AdminLoginUsecase.js";
import { BlockUserUseCase } from "../../useCases/admin/BlockUserUsecase.js";
import { GetBookingUsecase } from "../../useCases/bookings/getBookingUsecase.js";
import { GetAllUserUsecase } from "../../useCases/admin/getAllUserUsecase.js";
import { GetIdProofUscase } from "../../useCases/admin/getIdProofUscase.js";
import { IdProofActionUsecase } from "../../useCases/admin/idProofActionUsecase.js";
import { SearchUserusercase } from "../../useCases/admin/searchUserUsecase.js";
import { UnblockUserUseCase } from "../../useCases/admin/UnblockUserUsecase.js";
import { ApprovedVehicleusercase } from "../../useCases/admin/vehicles/ApprovedVehiceUsecase.js";
import { PendingVehicleusercase } from "../../useCases/admin/vehicles/PendingVehicleUsecase.js";
import { VehicleUpproveUsecase } from "../../useCases/admin/vehicles/vehicleApproveUsecase.js";
import { VendorAccessUsecase } from "../../useCases/admin/vendorAccessUsecase.js";
import { HashPassword } from "../services/hashPassword.js";
import { JwtService } from "../services/jwtService.js";
import { AdminWalletRepository } from "../../adapters/repository/wallet/adminWalletRepository.js";
import { NotificationRepository } from "../../adapters/repository/notification/notificationRepository.js";
import { GetAdminWalletController } from "../../adapters/controllers/admin/WalletManagment/GetWalletController.js";
import { GetAdminWalletUsecase } from "../../useCases/wallets/getAdminWalletUsecase.js";

import { UserRepository } from "../../adapters/repository/user/userRepository.js";
import { WalletRepository } from "../../adapters/repository/wallet/walletRepository.js";
import { DashboardStatsUseCase } from "../../useCases/dashboard/dashboardStatsUseCase.js";
import { FinancialOverviewUseCase } from "../../useCases/dashboard/financialOverviewUseCase.js";
import { UserManagementUseCase } from "../../useCases/admin/userManagementUseCase.js";
import { VehicleManagementUseCase } from "../../useCases/admin/vehicleManagementUseCase.js";
import { BookingAnalyticsUseCase } from "../../useCases/dashboard/bookingAnalyticsUseCase.js";
import { AdminReportQueryUsecase } from "../../useCases/report/AdminReportQueryUsecase.js";
import { AdminReportManagementUsecase } from "../../useCases/report/AdminReportManagementUsecase.js";
import { AdminNotificationUsecase } from "../../useCases/notification/AdminNotificationUsecase.js";
import { DashboardController } from "../../adapters/controllers/admin/dashboardController.js";
import { AdminReportQueryController } from "../../adapters/controllers/report/AdminReportQueryController.js";
import { AdminReportManagementController } from "../../adapters/controllers/report/AdminReportManagementController.js";
import { AdminNotificationController } from "../../adapters/controllers/report/AdminNotificationController.js";
import { ReportRepository } from "../../adapters/repository/report/reportRepository.js";
import { CreateNotificationUsecase } from "../../useCases/notification/CreateNotificationUsecase.js";
import { NotificationManagerAdapter } from "../../adapters/controllers/notification/NotificationSocketIOAdapter.js";

//-----------admin login------------
const adminRepository = new AdminRepository()
const hashPassword = new HashPassword()
const jwtService = new JwtService()
const adminWalletRepository = new AdminWalletRepository()
const loginAdminUsecase = new LoginAdminUsecase(adminRepository,hashPassword,adminWalletRepository,jwtService)
export const adminLoginController = new AdminLoginController(loginAdminUsecase)

//------get All Usersss-------------
const getAllUserUsecase = new GetAllUserUsecase(adminRepository)
export const getAllUserController = new GetAllUserController(getAllUserUsecase)

//------block user------------

const blockUserUseCase = new BlockUserUseCase(adminRepository)
export const blockUserController = new BlockUserController(blockUserUseCase)

//--------unblock user-----------
const unblockUserUseCase = new UnblockUserUseCase(adminRepository)
export const unblockUserController = new UnblockUserController(unblockUserUseCase)

//-----search user----------

const searchUserusercase = new SearchUserusercase(adminRepository)
export const searchUserController = new SearchUserController(searchUserusercase)

//------approve vehicle--------

const vehicleRepository = new VehicleRepository()
const notificationRepository = new NotificationRepository()
const notificationManagerAdapter = new NotificationManagerAdapter()
const createNotificationUsecase = new CreateNotificationUsecase(notificationRepository,notificationManagerAdapter)
const vehicleUpproveUsecase = new VehicleUpproveUsecase(vehicleRepository,createNotificationUsecase)
export const vehicleUpproveController = new VehicleUpproveController(vehicleUpproveUsecase)

//-------fetch pending vehicle------
const pendingVehicleUsecase = new PendingVehicleusercase(adminRepository)
export const pendingVehicleController = new PendingVehicleController(pendingVehicleUsecase)

//-------fetch vehicle------

const approvedVehicleUsecase = new ApprovedVehicleusercase(adminRepository)
export const ApprovedVehiceController = new GetApprovedVehicleController(approvedVehicleUsecase)

//-----fetch id Proof-------------
const getIdProofUscase = new GetIdProofUscase(adminRepository)
export const getIdProofController = new GetIdProofController(getIdProofUscase)

//------ id proof action-----------

const idProofActionUsecase = new IdProofActionUsecase(adminRepository)
export const idProofActionController = new IdProofActionController(idProofActionUsecase)

//-------vendor access--------

const vendorAccessUsecase = new VendorAccessUsecase(adminRepository,createNotificationUsecase,vehicleRepository)
export const vendorAccessController = new VendorAccessController(vendorAccessUsecase)

//-------get booking data--------
const bookingRepository = new BookingRepository()
const getBookingUsecase = new GetBookingUsecase(bookingRepository)
export const getBookingController = new GetBookingController(getBookingUsecase)

//------get wallet details---------
const getAdminWalletUsecase = new GetAdminWalletUsecase(adminWalletRepository)
export const getAdminWalletController = new GetAdminWalletController(getAdminWalletUsecase)

const userRepository = new UserRepository()
const walletRepository = new WalletRepository()
const reportRepository = new ReportRepository()

const dashboardStatsUseCase = new DashboardStatsUseCase(userRepository, vehicleRepository, bookingRepository, walletRepository)
const financialOverviewUseCase = new FinancialOverviewUseCase(bookingRepository, walletRepository, vehicleRepository)
const userManagementUseCase = new UserManagementUseCase(userRepository)
const vehicleManagementUseCase = new VehicleManagementUseCase(vehicleRepository, bookingRepository)
const bookingAnalyticsUseCase = new BookingAnalyticsUseCase(bookingRepository)
const createNotificationUseCase = new CreateNotificationUsecase(notificationRepository,notificationManagerAdapter)

const adminReportQueryUseCase = new AdminReportQueryUsecase(reportRepository, userRepository, bookingRepository, vehicleRepository)
const adminReportManagementUseCase = new AdminReportManagementUsecase(reportRepository)
const adminNotificationUseCase = new AdminNotificationUsecase(createNotificationUseCase)

export const dashboardController = new DashboardController(dashboardStatsUseCase, financialOverviewUseCase,userManagementUseCase,vehicleManagementUseCase,bookingAnalyticsUseCase)

export const adminReportQueryController = new AdminReportQueryController(adminReportQueryUseCase)
export const adminReportManagementController = new AdminReportManagementController(adminReportManagementUseCase)
export const adminNotificationController = new AdminNotificationController(adminNotificationUseCase)
