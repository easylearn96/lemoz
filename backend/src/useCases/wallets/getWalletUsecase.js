export class GetWalletUsecase {
  constructor(_walletRepository) {
    this._walletRepository = _walletRepository;
  }

  async getWalletByUserId(input) {
    try {
      const wallet = await this._walletRepository.getWalletByUserId(input.userId);
      
      if (!wallet) {
        return null;
      }

      const transactions = wallet.transactions
        ?.filter((transaction) => typeof transaction !== 'string')
        .map((transaction) => ({
          _id: transaction._id,
          transaction_id: transaction._id || '',
          user_id: wallet.user_id.toString(),
          amount: transaction.amount,
          transactionType: transaction.transactionType,
          purpose: transaction.purpose,
          createdAt: transaction.createdAt || new Date(),
          status: 'completed',
          from: transaction.from,
          to: transaction.to,          
        }));
      return {
        _id: wallet._id,
        user_id: wallet.user_id.toString(),
        balance: wallet.balance,
        createdAt: wallet.createdAt,
        updatedAt: wallet.updatedAt,
        transactions
      };
    } catch (error) {
      console.error('Error in GetWalletUsecase:', error);
      throw error;
    }
  }
}
