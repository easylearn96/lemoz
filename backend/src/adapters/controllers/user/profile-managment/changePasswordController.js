import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class ChangePasswordUserController{
    constructor(changePasswordUsecase){
        this._changePasswordUsecase=changePasswordUsecase
    }

    async handleEditProfle(req,res){
        try {
            const {_id,confirm,current,newPass}= req.body.values 
            const input = {
                _id,
                confirm,
                current,
                newPass
            };
            const newUser = await this._changePasswordUsecase.handleChangePassword(input);
            res.status(HttpStatus.OK).json({message:'password changed successfully', user: newUser});
        } catch (error) {
            console.error('Error while changing password:', error);
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Error while changing password",
                error: error instanceof Error ? error.message : 'Unknown error from change password controller',
            });
        }
    }
}
