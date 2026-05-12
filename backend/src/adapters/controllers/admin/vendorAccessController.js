import { HttpStatus } from "../../../domain/constants/httpStatus.js"

export class VendorAccessController {
    constructor(vendorAccessUsecase) {
        this._vendorAccessUsecase = vendorAccessUsecase
    }

    async handleVendorAccess(req,res) {
        try {
            const {userId} = req.params
            const {vendorAccess} = req.body
            const response = await this._vendorAccessUsecase.vendorAccess({userId,vendorAccess})
           res.status(HttpStatus.OK).json(response)
        } catch (error) {
            console.log('error while blocking user', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while blocking user',
                error: error instanceof Error ? error.message : 'error while blocking user'
            })
        }
    }
}
