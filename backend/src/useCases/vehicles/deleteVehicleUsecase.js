export class DeleteVehicleUsecase {
    constructor(vehicleRepository){
        this._vehicleRepository = vehicleRepository
    }
    async execute({ vehicleId }) {
        try {
            const result = await this._vehicleRepository.deleteVehicle(vehicleId);
            return {
                success: result,
                message: result ? 'Vehicle deleted successfully' : 'Failed to delete vehicle'
            };
        } catch (error) {
            console.log('error while deleting vehicle', error)
            return {
                success: false,
                message: 'Error occurred while deleting vehicle'
            };
        }
    }
}
