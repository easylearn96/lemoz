import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class IncomingBookingController {
    constructor(_incomingBookingUsecase) {
        this._incomingBookingUsecase = _incomingBookingUsecase
    }

    async getBookingDetails(req,res){
        try {
            const {userId} = req.params
            const {limit,page,search,status} = req.body
            const result = await this._incomingBookingUsecase.execute({ owner_id: userId, page, limit,search,status})
            res.json(result)
        } catch (error) {
            console.log('error while fetching booking details',error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while fetching booking details',
                error: error instanceof Error ? error.message : 'error while fetching booking details'
            })
        }
    }
}
