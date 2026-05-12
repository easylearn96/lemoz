import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class MyBookingController {

    constructor(_myBookingUsecase) {
        this._myBookingUsecase = _myBookingUsecase
    }

    async myBooking(req, res) {
        try {
            const {user_id,limit ,page,search,status} = req.body
            const response = await this._myBookingUsecase.execute({ user_id, page, limit,search,status })
            res.status(HttpStatus.OK).json(response)
        } catch (error) {
            console.log('error while fetching my booking ', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error while fetching my booking',
                error: error instanceof Error ? error.message : 'Unknown error from my booking controller',
            })
        }
    }
}
