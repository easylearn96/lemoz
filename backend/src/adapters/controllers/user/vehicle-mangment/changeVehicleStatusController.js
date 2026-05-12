import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class ChangeVehicleStatusController {
    constructor(changeVehicleStatusUsecase) {
      this._changeVehicleStatusUsecase = changeVehicleStatusUsecase
    }
    async changeVehicleStatus(req,res){
        try {
            const {vehicleId} = req.params;
            await this._changeVehicleStatusUsecase.execute({ vehicleId });
            res.status(HttpStatus.OK).json({message:'vehicle status changed successfully',success:true});
        } catch (error) {   
            console.log('error while changing vehicle status',error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message:'error while changing vehicle status',
                error:error instanceof Error ? error.message : 'error while changing vehicle status',
                success:false
            })
        }
    }
}
