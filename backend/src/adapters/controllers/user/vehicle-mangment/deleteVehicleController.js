import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class DeleteVehicleController {
    constructor(_deleteVehicleUseCase) {
        this._deleteVehicleUseCase = _deleteVehicleUseCase
    }
    async deleteVehicle(req,res){
        try {
            const {vehicleId} = req.params;
            await this._deleteVehicleUseCase.execute({ vehicleId });
            res.status(HttpStatus.OK).json({message:'vehicle deleted successfully',success:true});
        } catch (error) {
            console.log('error while deleting vehicle',error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message:'error while deleting vehicle',
                error:error instanceof Error ? error.message : 'error while deleting vehicle',
                success:false
            })
        }
    }
}
