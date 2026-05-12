export class PendingVehicleusercase {
    constructor(adminRepository){
        this._adminRepository = adminRepository
    }

async getPendingVehicle(input) {
    const result = await this._adminRepository.getPendingVehicle(input.page, input.limit,input.search);
    if (!result) return null;
    return { vehicle: result.vehicles, total: result.total };
}
}
