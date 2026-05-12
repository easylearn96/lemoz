import { Schema } from "mongoose";
import { ReportStatus } from "../../../domain/entities/ReportEntities.js";

export const ReportSchema = new Schema({
  reporterId: { type: String },
  bookingId: { type: String},
  ownerId :{type:String},
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(ReportStatus),
    default: ReportStatus.PENDING,
    required: true
  }
}, { timestamps: true });
