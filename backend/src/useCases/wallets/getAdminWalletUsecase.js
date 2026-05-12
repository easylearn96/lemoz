export class GetAdminWalletUsecase {
    constructor(_adminWalletRepository){
        this._adminWalletRepository = _adminWalletRepository;
    }
    
    async getWalletDetails() {
        const walletDetails = await this._adminWalletRepository.getwalletDetails()
        if (!walletDetails) return null;
        
             const transactions = walletDetails.transactions
                ?.filter((transaction) => typeof transaction !== 'string')
                .map((transaction) => ({
                  _id: transaction._id,
                  transaction_id: transaction._id || '',
                  amount: transaction.amount,
                  transactionType: transaction.transactionType,
                  purpose: transaction.purpose,
                  createdAt: transaction.createdAt || new Date(),
                  status: 'completed',
                  from: transaction.from,
                  to: transaction.to,          
                }));
        return {
            wallet: {
                _id: walletDetails._id,
                balance: walletDetails.balance,
                commission_balance: walletDetails.commission_balance,
                totalWithdrawals: walletDetails.penalty_balance,
                total_balance: walletDetails.total_balance,
                transactions
            }
        };
    }
}
