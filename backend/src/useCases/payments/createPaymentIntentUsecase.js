export class CreatePaymentIntentUsecase {
    constructor(_stripeService, _redisService) {
        this._stripeService = _stripeService
        this._redisService = _redisService
    }
    async createPaymentIntent(input) {
        try {
            const { bookingData } = input;
            console.log('booking data from payment intent usecase ', bookingData);
            const redisKey = `hold:vehicle:${bookingData.vehicle_id},startDate:${bookingData.start_date},endDate:${bookingData.end_date}`;

            const isHeld = await this._redisService.get(redisKey);
            console.log(isHeld,'isHeld')
            console.log(bookingData.user_id,'bookingData.user_id')
            if (isHeld ) {
                throw new Error('this vehicle is currently booked by another user.');
            }
            
            await this._redisService.set(redisKey, 600, bookingData.user_id); 
            const paymentIntentId = await this._stripeService.createPaymentIntent(bookingData.total_amount);
            
            if (!paymentIntentId) {
                throw new Error('Failed to create payment intent');
            }

            return {
                paymentIntentId
            };
        } catch (error) {
            console.error('Error creating payment intent:', error);
            throw error;
        }
    }
}
