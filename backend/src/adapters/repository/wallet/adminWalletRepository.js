import { adminWalletModel } from "../../../framework/database/models/adminWalletModel.js";

export class AdminWalletRepository {
    async createWallet() {
        return await adminWalletModel.create({
            balance: 0,
            commission_balance: 0,
            penalty_balance: 0,
            total_balance: 0,
            transactions: []
        })
    }
    
    async updateWalletBalance(amount) {
        await adminWalletModel.updateOne({}, {
            $inc: { 
                balance: amount,
                total_balance: amount
            }
        })
    }
    
    async updateCommissionBalance(amount) {
        await adminWalletModel.updateOne({}, {
            $inc: { 
                commission_balance: amount,
                total_balance: amount
            }
        })
    }
    
    async updatePenaltyBalance(amount) {
        await adminWalletModel.updateOne({}, {
            $inc: { 
                penalty_balance: amount,
                total_balance: amount
            }
        })
    }
    
    async addTransaction(transactionId) {
        await adminWalletModel.updateOne({}, {
            $push: { transactions: transactionId }
        })
    }
    async getwalletDetails() {
        const wallets = await adminWalletModel.find().populate('transactions');
        
        if (wallets.length === 0) {
            return null;
        }
        
        return wallets[0]
    }
    async checkWalletExist() {
        return await adminWalletModel.countDocuments() > 0
    }
}
