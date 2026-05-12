import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class WithdrawController {
    
    constructor(_withdrawUsecase) {
        this._withdrawUsecase = _withdrawUsecase
    }

    async withdraw(req, res) {
        try {
            const { bookingId } = req.params;
            const { userId } = req.body;
            
            const result = await this._withdrawUsecase.withdraw({ bookingId, userId });
            
            if (result) {
                res.status(HttpStatus.OK).json({
                    message: 'Withdrawal completed successfully',
                    success: true
                });
            } else {
                res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Withdrawal failed',
                    success: false
                });
            }
        } catch (error) {
            console.log('Error during withdrawal:', error);
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error during withdrawal',
                error: error instanceof Error ? error.message : 'Unknown withdrawal error'
            });
        }
    }
}
