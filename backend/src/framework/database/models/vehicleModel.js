import { model } from "mongoose";
import { VehicleSchema } from "../schema/vehicleSchema.js";

export const VehicleModel = model('vehicle', VehicleSchema)
