import { Schema, Types } from "mongoose";

export const adminWalletSchema = new Schema({   
  balance:{type: Number, required: true, default: 0},
  commission_balance:{type: Number, required: true, default: 0},
  penalty_balance:{type: Number, required: true, default: 0},
  total_balance:{type: Number, required: true, default: 0},
  transactions:[{type: Types.ObjectId, ref: 'transaction',default:[]}]
})
