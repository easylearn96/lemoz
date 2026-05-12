import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class UserLogoutController {
    constructor(logoutUserusecase) {
        this._logoutUserusecase = logoutUserusecase
    }
    async handleClientLogout(req, res) {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
                return
            }
            const token = authHeader.split(' ')[1];

            await this._logoutUserusecase.clientLogout({token});
            res.status(HttpStatus.OK).json({ message: "Logout successful" });

        } catch (error) {
            console.log('error while handling logout client', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while handling logout client',
                error: error instanceof Error ? error.message : 'error while handling logout client'
            })
        }
    }
}
