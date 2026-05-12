export class DashboardStatsUseCase {
    constructor(
        _userRepository,
        _vehicleRepository,
        _bookingRepository,
        _walletRepository
    ) {
        this._userRepository = _userRepository;
        this._vehicleRepository = _vehicleRepository;
        this._bookingRepository = _bookingRepository;
        this._walletRepository = _walletRepository;
    }

    async getTotalRevenue() {
        try {
            // Get total revenue from completed bookings
            const totalRevenue = await this._bookingRepository.getTotalRevenue();
            
            // Get revenue from last month for growth calculation
            const lastMonthRevenue = await this._bookingRepository.getLastMonthRevenue();
            const growthPercentage = lastMonthRevenue > 0 
                ? ((totalRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 
                : 0;

            // Get chart data for the last 8 periods
            const chartData = await this._bookingRepository.getRevenueChartData();

            return {
                totalRevenue,
                growthPercentage: Math.round(growthPercentage * 100) / 100,
                chartData
            };
        } catch (error) {
            throw new Error(`Failed to get total revenue: ${error}`);
        }
    }

    async getTotalBookings() {
        try {
            const totalBookings = await this._bookingRepository.getTotalBookingsCount();
            const lastMonthBookings = await this._bookingRepository.getLastMonthBookingsCount();
            
            const growthPercentage = lastMonthBookings > 0 
                ? ((totalBookings - lastMonthBookings) / lastMonthBookings) * 100 
                : 0;

            const chartData = await this._bookingRepository.getBookingsChartData();

            return {
                totalBookings,
                growthPercentage: Math.round(growthPercentage * 100) / 100,
                chartData
            };
        } catch (error) {
            throw new Error(`Failed to get total bookings: ${error}`);
        }
    }

    async getTotalUsers() {
        try {
            const totalUsers = await this._userRepository.getTotalUsersCount();
            const activeUsers = await this._userRepository.getActiveUsersCount();
            
            // Calculate growth percentage (mock calculation)
            const growthPercentage = totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0;
            
            // Generate mock chart data
            const chartData = [65, 75, 85, 70, 80, 90, 85, 95];

            return {
                totalUsers,
                growthPercentage,
                chartData
            };
        } catch (error) {
            throw new Error(`Failed to get total users: ${error}`);
        }
    }

    async getActiveVehicles() {
        try {
            const activeVehicles = await this._vehicleRepository.getActiveVehiclesCount();
            const lastMonthActiveVehicles = await this._vehicleRepository.getLastMonthActiveVehiclesCount();
            
            const growthPercentage = lastMonthActiveVehicles > 0 
                ? ((activeVehicles - lastMonthActiveVehicles) / lastMonthActiveVehicles) * 100 
                : 7; // Default growth percentage

            // Generate mock chart data
            const chartData = [45, 65, 35, 85, 55, 95, 75, 80];

            return {
                activeVehicles,
                growthPercentage: Math.round(growthPercentage * 100) / 100,
                chartData
            };
        } catch (error) {
            throw new Error(`Failed to get active vehicles: ${error}`);
        }
    }
}
