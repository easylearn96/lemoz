import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class PendingVehicleController{
    constructor(pendingVehicleUsecase) {
        this._pendingVehicleUsecase = pendingVehicleUsecase
    }
    
    async approveVehicle(req, res) {
        try {
            const page = req.query.page ? parseInt(req.query.page) : 1;
            const limit = req.query.limit ? parseInt(req.query.limit) : 10;
            const search = req.query.search
            const response = await this._pendingVehicleUsecase.getPendingVehicle({page, limit, search})
            console.log(response)
            res.status(HttpStatus.OK).json(response )
        } catch (error) {
            console.error('Error while fetching pending vehicles:', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error while fetching pending vehicles',
                error: error instanceof Error ? error.message : 'Unknown error'
            })
        }
    }
    
}   
