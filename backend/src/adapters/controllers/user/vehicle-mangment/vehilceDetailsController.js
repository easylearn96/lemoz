import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class VehilceDetailsController {

    constructor(_vehicleDetailsUsecase) {
        this._vehicleDetailsUsecase = _vehicleDetailsUsecase
    }

    async getVehicleDetails(req, res) {
        try {
            const { id } = req.params
            const vehicle = await this._vehicleDetailsUsecase.getVehicleDetails({id})
            if (!vehicle) {
                res.status(HttpStatus.NOT_FOUND).json({ message: 'Vehicle not found' });
                return
            }
            res.status(HttpStatus.OK).json(vehicle);
        }
        catch (error) {
            console.error('Error while fetching vehicle details:', error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: "An error occurred while fetching vehicle details",
                error: error instanceof Error ? error.message : 'Unknown error from getVehicleDetails controller',
            });
        }
    }
}
