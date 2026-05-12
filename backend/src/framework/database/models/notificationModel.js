import { model } from "mongoose";
import { notificationSchema } from "../schema/notificationSchema.js";

export const notificationModel = model('notification', notificationSchema)
