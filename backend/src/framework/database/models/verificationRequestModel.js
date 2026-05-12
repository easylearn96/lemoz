import { model } from "mongoose";
import { verificationRequestSchema } from "../schema/VerificationRequestSchema.js";

export const verificationRequestModel = model('VerificationRequest', verificationRequestSchema);
