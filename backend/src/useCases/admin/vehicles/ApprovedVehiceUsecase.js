export class ApprovedVehicleusercase {
    constructor(adminRepository){
        this._adminRepository = adminRepository
    }

async getApprovedVehicle(input) {
    const result = await this._adminRepository.getApprovedVehicle(input.search, input.page, input.limit, input.filters);
    if (!result) return null;
    return { vehicle: result.vehicles, total: result.total, totalCount: result.totalCount };
}
}
