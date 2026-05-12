export class FinancialOverviewUseCase {
    constructor(
        _bookingRepository,
        _walletRepository,
        _vehicleRepository
    ) {
        this._bookingRepository = _bookingRepository;
        this._walletRepository = _walletRepository;
        this._vehicleRepository = _vehicleRepository;
    }

    async getFinancialOverview() {
        try {
            // Get commission from completed bookings
            const commission = await this._bookingRepository.getTotalCommission();
            
            // Get penalties from cancelled/violated bookings
            const penalties = await this._bookingRepository.getTotalPenalties();
            
            // Get refunds from cancelled bookings
            const refunds = await this._bookingRepository.getTotalRefunds();
            
            // Get top revenue generating vehicles
            const rawTopRevenueVehicles = await this._vehicleRepository.getTopRevenueVehicles();
            
            // Calculate percentages for top revenue vehicles (business logic)
            const totalRevenue = rawTopRevenueVehicles.reduce((sum, vehicle) => sum + vehicle.revenue, 0);
            const topRevenueVehicles = rawTopRevenueVehicles.map(vehicle => ({
                type: vehicle.type || 'Unknown',
                model: vehicle.model || 'Unknown',
                revenue: vehicle.revenue || 0,
                percentage: totalRevenue > 0 ? Math.round((vehicle.revenue / totalRevenue) * 100) : 0
            }));
            
            // Get wallet balance
            const walletBalance = await this._walletRepository.getAdminWalletBalance();

            return {
                commission,
                penalties,
                refunds,
                topRevenueVehicles,
                walletBalance
            };
        } catch (error) {
            throw new Error(`Failed to get financial overview: ${error}`);
        }
    }
}
