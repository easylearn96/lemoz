import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class GetApprovedVehicleController{
    constructor(IapprovedVehicleUsecase) {
        this._approvedVehicleUsecase = IapprovedVehicleUsecase
    }
    
    async approveVehicle(req, res) {
        try {
            const page = req.query.page ? Number(req.query.page) : 1;
            const limit = req.query.limit ? Number(req.query.limit) : 10;
            const search = req.query.search
            const { category, fuelType, transmission } = req.query;
            
            const filters = {
                category: String(category || 'all'),
                fuelType: String(fuelType || 'all'),
                transmission: String(transmission || 'all')
            };
            
            const response = await this._approvedVehicleUsecase.getApprovedVehicle({search, page, limit, filters})
            res.status(HttpStatus.OK).json(response )
        } catch (error) {
            console.error('Error while fetching approved vehicles:', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error while fetching approved vehicles',
                error: error instanceof Error ? error.message : 'Unknown error'
            })
        }
    }
    
}
