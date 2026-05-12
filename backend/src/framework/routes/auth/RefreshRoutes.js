import { Router } from "express";
import { refreshTokenController } from "../../DI/serviceInject.js";

export class AuthRoute {
    constructor() {
        this.AuthRouter = Router()
        this.setRoute()
    }
    setRoute() {
        this.AuthRouter.get('/', (req, res) => {
            console.log('hyy iam here')
            refreshTokenController.handleRefreshToken(req, res)
        })
    }
}
