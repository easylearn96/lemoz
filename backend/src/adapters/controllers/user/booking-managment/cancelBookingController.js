import { HttpStatus } from "../../../../domain/constants/httpStatus.js";
export class CancelBookingController {
    constructor(_cancelBookingUseCase){
        this._cancelBookingUseCase = _cancelBookingUseCase
    }

    async cancelBooking(req,res){
        try {
            const {reason} = req.body;
            const {bookingId}= req.params
            await this._cancelBookingUseCase.execute({ booking_id: bookingId, cancellation_reason: reason });
            res.status(HttpStatus.OK).json({message:"Booking Cancelled"})
        } catch (error) {
            console.log('error while canceling booking ', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error while canceling booking',
                error: error instanceof Error ? error.message : 'Unknown error from cancel booking controller',
            })
        }
    }
}
