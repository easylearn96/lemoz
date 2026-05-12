import { model } from "mongoose";
import { locationSchema } from "../schema/locationSchema.js";

export const locationModel = model('location', locationSchema)
