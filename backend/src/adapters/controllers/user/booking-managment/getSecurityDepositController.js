import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class GetSecurityDepositController {
    constructor(_getSecurityDepositUsecase){
        this._getSecurityDepositUsecase = _getSecurityDepositUsecase
    }
    

    async handleGetSecurityDeposit(req,res){
        try {
            const response = await this._getSecurityDepositUsecase.getSecurityDeposit()
            res.status(HttpStatus.OK).json(response)
        } catch (error) {
            console.log('error while fetching security deposit ', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error while fetching security deposit',
                error: error instanceof Error ? error.message : 'Unknown error from security deposit controller',
            })
        }
    }
}
