import { Schema, Types } from "mongoose";

export const walletSchema = new Schema({
  user_id: { type: Types.ObjectId, ref: 'user', required: true, unique: true },
  balance: { type: Number, required: true, default: 0 },
  is_frozen: { type: Boolean, default: false },
  transactions: [{ type: Types.ObjectId, ref: 'transaction' , default:[] }]

}, { timestamps: true });
