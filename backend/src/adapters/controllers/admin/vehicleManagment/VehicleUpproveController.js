import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class VehicleUpproveController{

    constructor(vehicleUpproveUsecase) {
        this._vehicleUpproveUsecase = vehicleUpproveUsecase
    }
    
    async approveVehicle(req, res) {
        try {
            const { id } = req.params
            const {action,reason}= req.body
            await this._vehicleUpproveUsecase.approveVehicle({id,action,reason})
            res.status(HttpStatus.OK).json({ message: `Vehicle ${action} successfully` })
        } catch (error) {
            console.log('Error while approving vehicle:', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error while approving vehicle',
                error: error instanceof Error ? error.message : 'Unknown error'
            })
        }
    }
}
