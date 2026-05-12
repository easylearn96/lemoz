import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class EditProfileController{
    constructor(EditProfileUseCase){
        this._EditProfileUseCase=EditProfileUseCase
    }

    async handleEditProfle(req,res){
        try {
              const {name,email,phone,ImageUrl}=req.body
            const updatedUser = await this._EditProfileUseCase.handleEditProfile({name,email,phone,ImageUrl});
            res.status(HttpStatus.OK).json({message: 'Profile updated successfully', user: updatedUser});
        } catch (error) {
           console.log('error while editing profile', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Error while editing profile",
                error: error instanceof Error ? error.message : 'Unknown error from edit profile controller',
            })
        }
    }
}
