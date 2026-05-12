import { model } from "mongoose";
import { ReportSchema } from "../schema/reportSchema.js";

export const reportModel = model('report', ReportSchema);
