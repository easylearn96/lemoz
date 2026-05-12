import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class AddVehicleController {
    constructor(addVehicleUsecase){
        this._addVehicleUsecase = addVehicleUsecase
    }

    async addVehicle(req,res){
        try {
            const {vehicle,location} = req.body
           await this._addVehicleUsecase.addVehicle({vehicle,location})
            res.status(HttpStatus.CREATED).json({message:'vehicle added'})
        } catch (error) {
              console.log('error while adding vehicle', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Error while adding vehicle",
                error: error instanceof Error ? error.message : 'Unknown error from add vehicle controller',
            })
        }
    }
}
