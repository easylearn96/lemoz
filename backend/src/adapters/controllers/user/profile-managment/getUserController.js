import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class GetUserController {

    constructor(_getUserUsecase) {
        this._getUserUsecase = _getUserUsecase;
    }


    async getUser(req, res) {

        const userId = req.params.id;
        try {
            const user = await this._getUserUsecase.getUser({userId});
            if (!user) {
                res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' });
                return;
            }
            res.status(HttpStatus.OK).json({ message: 'User fetched successfully', user });
        } catch (error) {
            console.log('error while fetching user', error);
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Error while fetching user",
                error: error instanceof Error ? error.message : 'Unknown error from get user controller',
            });
        }
    }
}
