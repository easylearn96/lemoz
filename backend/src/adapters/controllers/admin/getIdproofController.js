import { HttpStatus } from "../../../domain/constants/httpStatus.js";

export class GetIdProofController {
    constructor(_getIdProofUscase) {
        this._getIdProofUscase = _getIdProofUscase;
    }

    async getIdProof(req, res) {
        try {
            const {status,currentPage,itemsPerPage} = req.body
            const vehicle = await this._getIdProofUscase.getIdProof(status,currentPage,itemsPerPage);
            res.status(HttpStatus.OK).json(vehicle);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'An error occurred while retrieving ID proof.',
                error: error instanceof Error ? error.message : String(error)
            });
            console.error('GetIdProofController.getIdProof error:', error);
        }
    }
}
