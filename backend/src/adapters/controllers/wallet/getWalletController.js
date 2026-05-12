import { HttpStatus } from "../../../domain/constants/httpStatus.js";

export class GetWalletController{
    constructor(_getWalletUsecase) {
        this._getWalletUsecase = _getWalletUsecase;
    }

    async getWalletDetails(req, res) {
        try {
            const {userId} = req.params
            
            const input = { userId };
            const wallet = await this._getWalletUsecase.getWalletByUserId(input);
            if (!wallet) {
                res.status(HttpStatus.NOT_FOUND).json({ message: 'Wallet not found' });
                return;
            }
            res.status(HttpStatus.OK).json(wallet);
        } catch (error) {
            console.error('Error fetching wallet details:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
