import { model } from "mongoose";
import { BookingSchema } from "../schema/bookingSchema.js";

export const bookingModel = model('booking', BookingSchema)
