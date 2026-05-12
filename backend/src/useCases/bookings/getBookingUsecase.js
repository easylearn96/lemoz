export class GetBookingUsecase {
    constructor(_bookingRepository){
        this._bookingRepository = _bookingRepository
    }
     async getBookingData(input) {
        const result = await this._bookingRepository.getBookingData(input.search || '', input.limit, input.page)
        if (!result) return null;
        return {
            bookings: result.bookings,
            total: result.total
        };
     }
}
