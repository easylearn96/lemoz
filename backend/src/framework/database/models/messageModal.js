import { model } from "mongoose";
import { messageSchema } from "../schema/messageSchema.js";

export const messageModel = model('message', messageSchema)
