import { Schema } from "mongoose";

export const verificationRequestSchema = new Schema(
  {
    idProofUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
  },
    reason: {
      type: String,
      default: "", 
    },
  },
  {
    timestamps: true,
  }
);
