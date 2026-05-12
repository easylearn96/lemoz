import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class RideEndController {
    constructor(_rideEndUsecase) {
        this._rideEndUsecase = _rideEndUsecase
    }


    async handleRideEnd(req,res){
        try {
            const {bookingId} = req.params
            const scanner_user_id = req.user?.userId

            if (!scanner_user_id) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ message: "User authentication required" });
            }
            const input = { bookingId };
            const result = await this._rideEndUsecase.execute(input, scanner_user_id)
            res.status(HttpStatus.OK).json({message:"Ride ended successfully",result})
        } catch (error) {
            console.log('error while ride end',error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while ride end',
                error: error instanceof Error ? error.message : 'error while ride end'
            })
        }
    }
}
