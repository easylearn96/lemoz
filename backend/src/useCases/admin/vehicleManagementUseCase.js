export class VehicleManagementUseCase {
    constructor(_vehicleRepository, _bookingRepository) {
        this._vehicleRepository = _vehicleRepository;
        this._bookingRepository = _bookingRepository;
    }

    async getVehicleManagementStats() {
        try {
            const pendingVehicles = await this._vehicleRepository.getPendingVehiclesCount();
            const approvedVehicles = await this._vehicleRepository.getApprovedVehiclesCount();
            const rejectedVehicles = await this._vehicleRepository.getRejectedVehiclesCount();
            
            const averageRevenuePerBooking = await this._bookingRepository.getAverageRevenuePerBooking();
            
            // Get raw vehicle activity data from repository
            const rawChartData = await this._vehicleRepository.getVehicleActivityChartData();
            
            // Calculate chart data with percentages and colors (business logic)
            const totalVehicles = rawChartData.total;
            const chartData = [
                { 
                    height: totalVehicles > 0 ? Math.round((rawChartData.active / totalVehicles) * 100) : 0, 
                    color: '#10B981' 
                }, // Green for active vehicles
                { 
                    height: totalVehicles > 0 ? Math.round((rawChartData.pending / totalVehicles) * 100) : 0, 
                    color: '#F59E0B' 
                }, // Yellow for pending vehicles
                { 
                    height: totalVehicles > 0 ? Math.round((rawChartData.rejected / totalVehicles) * 100) : 0, 
                    color: '#EF4444' 
                }  // Red for rejected vehicles
            ];

            return {
                pendingVehicles,
                approvedVehicles,
                rejectedVehicles,
                averageRevenuePerBooking,
                chartData
            };
        } catch (error) {
            throw new Error(`Failed to get vehicle management stats: ${error}`);
        }
    }
}
