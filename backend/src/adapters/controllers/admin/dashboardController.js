import { HttpStatus } from "../../../domain/constants/httpStatus.js";

export class DashboardController {
    constructor(
        dashboardStatsUseCase,
        financialOverviewUseCase,
        userManagementUseCase,
        vehicleManagementUseCase,
        bookingAnalyticsUseCase
    ) {
        this.dashboardStatsUseCase = dashboardStatsUseCase;
        this.financialOverviewUseCase = financialOverviewUseCase;
        this.userManagementUseCase = userManagementUseCase;
        this.vehicleManagementUseCase = vehicleManagementUseCase;
        this.bookingAnalyticsUseCase = bookingAnalyticsUseCase;
    }

    async getTotalRevenue(req, res) {
        try {
            const data = await this.dashboardStatsUseCase.getTotalRevenue();
            res.status(HttpStatus.OK).json({
                success: true,
                data
            });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to get total revenue'
            });
        }
    }

    async getTotalBookings(req, res) {
        try {
            const data = await this.dashboardStatsUseCase.getTotalBookings();
            res.status(HttpStatus.OK).json({
                success: true,
                data
            });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to get total bookings'
            });
        }
    }

    async getTotalUsers(req, res) {
        try {
            const data = await this.dashboardStatsUseCase.getTotalUsers();
            res.status(HttpStatus.OK).json({
                success: true,
                data
            });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to get total users'
            });
        }
    }

    async getActiveVehicles(req, res) {
        try {
            const data = await this.dashboardStatsUseCase.getActiveVehicles();
            res.status(HttpStatus.OK).json({
                success: true,
                data
            });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to get active vehicles'
            });
        }
    }

    async getFinancialOverview(req, res) {
        try {
            const data = await this.financialOverviewUseCase.getFinancialOverview();
            res.status(HttpStatus.OK).json({
                success: true,
                data
            });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to get financial overview'
            });
        }
    }

    async getUserManagementStats(req, res) {
        try {
            const data = await this.userManagementUseCase.getUserManagementStats();
            res.status(HttpStatus.OK).json({
                success: true,
                data
            });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to get user management stats'
            });
        }
    }

    async getVehicleManagementStats(req, res) {
        try {
            const data = await this.vehicleManagementUseCase.getVehicleManagementStats();
            res.status(HttpStatus.OK).json({
                success: true,
                data
            });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to get vehicle management stats'
            });
        }
    }

    async getBookingAnalytics(req, res) {
        try {
            const data = await this.bookingAnalyticsUseCase.getBookingAnalytics();
            res.status(HttpStatus.OK).json({
                success: true,
                data
            });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to get booking analytics'
            });
        }
    }

    async getAllDashboardData(req, res) {
        try {
            const [
                totalRevenue,
                totalBookings,
                totalUsers,
                activeVehicles,
                financialOverview,
                userManagement,
                vehicleManagement,
                bookingAnalytics
            ] = await Promise.all([
                this.dashboardStatsUseCase.getTotalRevenue(),
                this.dashboardStatsUseCase.getTotalBookings(),
                this.dashboardStatsUseCase.getTotalUsers(),
                this.dashboardStatsUseCase.getActiveVehicles(),
                this.financialOverviewUseCase.getFinancialOverview(),
                this.userManagementUseCase.getUserManagementStats(),
                this.vehicleManagementUseCase.getVehicleManagementStats(),
                this.bookingAnalyticsUseCase.getBookingAnalytics()
            ]);

            res.status(HttpStatus.OK).json({
                success: true,
                data: {
                    totalRevenue,
                    totalBookings,
                    totalUsers,
                    activeVehicles,
                    financialOverview,
                    userManagement,
                    vehicleManagement,
                    bookingAnalytics
                }
            });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to get dashboard data'
            });
        }
    }
}
