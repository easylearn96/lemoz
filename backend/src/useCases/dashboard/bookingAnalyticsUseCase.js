export class BookingAnalyticsUseCase {
    constructor(_bookingRepository ) {
        this._bookingRepository = _bookingRepository;
    }

    async getBookingAnalytics() {
        try {
            // Get booking data for the last 7 days
            const chartData = await this._bookingRepository.getWeeklyBookingData();
            
            // Get number of active cities
            const activeCities = await this._bookingRepository.getActiveCitiesCount();
            
            // Get top city by bookings
            const topCity = await this._bookingRepository.getTopCityByBookings();
            console.log(topCity)
            return {
                chartData,
                activeCities,
                topCity
            };
        } catch (error) {
            throw new Error(`Failed to get booking analytics: ${error}`);
        }
    }
}
