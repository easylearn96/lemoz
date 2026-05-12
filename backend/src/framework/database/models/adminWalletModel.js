import { model } from "mongoose";
import { adminWalletSchema } from "../schema/adminWalletSchema.js";

export const adminWalletModel = model('adminWallet', adminWalletSchema);
