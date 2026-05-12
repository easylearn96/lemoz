import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class GetAdminWalletController {
    constructor(_getAdminWalletUsecase){
        this._getAdminWalletUsecase = _getAdminWalletUsecase
    }
    async getWalletDetails(req, res){
        try {
            const walletDetails = await this._getAdminWalletUsecase.getWalletDetails()
            return res.status(HttpStatus.OK).json({message:'Wallet details fetched successfully',success:true,walletDetails})
        } catch (error) {
            console.log(error)
            return res.status(HttpStatus.BAD_REQUEST).json({message:'Internal server error'})
        }
    }
}
