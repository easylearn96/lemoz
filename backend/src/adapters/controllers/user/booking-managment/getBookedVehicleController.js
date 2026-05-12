import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class GetBookedVehicleController {
    constructor(getBookedVehicleUsecase) {
        this._getBookedVehicleUsecase = getBookedVehicleUsecase;
    }
    async getBookedVehicleDetails(req, res) {
        try {
            const { vehicleId } = req.params;
            const bookedVehicles = await this._getBookedVehicleUsecase.execute({vehicleId});
            res.status(HttpStatus.OK).json(bookedVehicles);
        } catch (error) {
            console.error('Error while fetching booked vehicles', error);
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Error while fetching booked vehicles",
                error: error instanceof Error ? error.message : 'Unknown error from GetBookedVehicleController',
            });
        }
    }
}
