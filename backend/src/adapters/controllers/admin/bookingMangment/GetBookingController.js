import { HttpStatus } from "../../../../domain/constants/httpStatus.js"

export class GetBookingController {
    constructor(_getBookingUsecase) {
        this._getBookingUsecase = _getBookingUsecase
    }

    async getBookingData(req, res) {
        try {
            const { search, limit, page } = req.body
            const response = await this._getBookingUsecase.getBookingData({search, limit, page})
            res.status(HttpStatus.OK).json(response)

        } catch (error) {
           console.log('error while fetching booking', error)
           res.status(HttpStatus.BAD_REQUEST).json({
            message: "Error while fetching booking",
            error: error instanceof Error ? error.message : 'Unknown error from getBooking controller',
        })
        }
    }
}
