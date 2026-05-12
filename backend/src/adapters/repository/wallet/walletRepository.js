import { WalletModel } from "../../../framework/database/models/walletModel.js";
import { BaseRepository } from "../base/BaseRepo.js";

export class WalletRepository extends BaseRepository {
  constructor() {
    super(WalletModel);
  }

  async getWalletById(walletId) {
    return await this.findById(walletId);
  }

  async getWalletByUserId(userId) {
  const wallet = await WalletModel.findOne({ user_id: userId }).populate('transactions')
    console.log(wallet)
    return wallet
  }

  async updateWalletBalance(userId, amount) {
    return await WalletModel.findOneAndUpdate(
      { user_id: userId},
      { $inc: { balance: amount } },
      { new: true }
    )
  }
  async updateWallet(userId, amount) {
    return await WalletModel.findOneAndUpdate(
      { user_id: userId},
      { $inc: { balance: amount } },
      { new: true }
    )
  }

  async addTransaction(userId, transactionId) {
    return await WalletModel.findOneAndUpdate(
      { user_id: userId },
      { $push: { transactions: transactionId } },
      { new: true }
    )
  }

  // Dashboard Analytics Method
  async getAdminWalletBalance() {
    // Calculate total admin wallet balance from all transactions
    const result = await WalletModel.aggregate([
      {
        $group: {
          _id: null,
          totalBalance: { $sum: "$balance" }
        }
      }
    ]);
    
    return result.length > 0 ? result[0].totalBalance : 0;
  }
}
