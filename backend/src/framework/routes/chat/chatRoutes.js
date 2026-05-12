import { Router } from "express";
import { injectedUserBlockChecker, injectedVerfyToken, tokenTimeExpiryValidationMiddleware } from "../../DI/serviceInject.js";
import { checkRoleBaseMiddleware } from "../../../adapters/middlewares/checkRoleBasedMIddleware.js";
import { createChatController, getChatController, getMessageController, enableChatController } from "../../DI/chatInject.js";

export class ChatRoutes {
    constructor() {
        this.ChatRoutes = Router();
        this.setRoutes();
    }

    setRoutes() {

        this.ChatRoutes.use(injectedVerfyToken, tokenTimeExpiryValidationMiddleware, checkRoleBaseMiddleware('user'), injectedUserBlockChecker)

        // Chat routes
        this.ChatRoutes.post('/find-or-create', (req, res)=>{
            createChatController.findOrCreateChat(req,res)})
        
        this.ChatRoutes.get('/chats/:userId', (req, res)=>{
            getChatController.getChatsOfUser(req,res)})
            
        this.ChatRoutes.get('/messages/:chatId', (req, res)=>{
            getMessageController.getMessagesByChatId(req,res)})
            
        this.ChatRoutes.post('/enable-chat', (req, res)=>{
            enableChatController.enableChat(req,res)
        })
    }
}
