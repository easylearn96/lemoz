import { HttpStatus } from "../../../../domain/constants/httpStatus.js"

export class CreateBookingController {
    constructor(createBookingUsecase) {
        this._createBookingUsecase = createBookingUsecase
    }

    async createBooking(req,res) {
      try {
        const {stripeIntentId, user_id, bookingData} = req.body

        const input = {
          bookingData,
          user_id,
          stripeIntentId
        };

        const response = await this._createBookingUsecase.createBooking(input)
        res.status(HttpStatus.OK).json(response)
      } catch (error) {
          console.log('error while creating booking ', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error while creating booking',
                error: error instanceof Error ? error.message : 'Unknown error from create booking controller',
            })
      }
    }
}
