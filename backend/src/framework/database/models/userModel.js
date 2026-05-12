import { model } from "mongoose";
import { userSchema } from "../schema/userSchema.js";

export const userModel = model('user', userSchema)
