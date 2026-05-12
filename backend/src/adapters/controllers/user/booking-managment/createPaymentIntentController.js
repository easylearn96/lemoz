import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class CreatePaymentIntentController {
    constructor(_createPaymentIntentUsecase) {
        this._createPaymentIntentUsecase = _createPaymentIntentUsecase
    }
    async createPaymentIntent(req, res) {
        try {
           const bookingData = req.body.bookingDataBody 
            console.log(bookingData,'log from create payment intent controller')
            
            const input = {
                bookingData
            };
            
            const response = await this._createPaymentIntentUsecase.createPaymentIntent(input)
            res.status(HttpStatus.OK).json({ sessionId: response.paymentIntentId })

        } catch (error) {
            console.log('error while creating payment intent ', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error while creating payment intent',
                error: error instanceof Error ? error.message : 'Unknown error from create payment intent controller',
            })
        }
    }
}
