import { model } from "mongoose";
import { walletSchema } from "../schema/walletSchema.js";

export const WalletModel = model('Wallet', walletSchema);
