export class ChangeVehicleStatusUsecase {
    constructor(_vehicleRepository){
        this._vehicleRepository = _vehicleRepository;
    }
    async execute({ vehicleId }) {
       const result = await this._vehicleRepository.changeVehicleStatus(vehicleId);
       return {
           success: result,
           message: result ? 'Vehicle status changed successfully' : 'Failed to change vehicle status'
       };
    }
}
