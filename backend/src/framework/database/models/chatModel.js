import { model } from "mongoose";
import { chatSchema } from "../schema/chatSchema.js";

export const chatModel = model('chat', chatSchema)
