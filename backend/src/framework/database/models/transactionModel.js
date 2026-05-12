import { model } from "mongoose";
import { transactionSchema } from "../schema/transactionSchema.js";

export const transactionModel = model('transaction', transactionSchema);
