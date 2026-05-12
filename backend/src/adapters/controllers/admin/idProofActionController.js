import { HttpStatus } from "../../../domain/constants/httpStatus.js";

export class IdProofActionController {

    constructor(_idProofActionUsecase){
        this._idProofActionUsecase = _idProofActionUsecase
    }

    async idProofAction (req,res){
        try {
            const {action,owner_id,reason} = req.body
            const {id}= req.params
            await this._idProofActionUsecase.setAction({idProof_id:id,owner_id,action,reason})
            res.status(HttpStatus.OK).json({message:action+' success'})   
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'An error occurred while processing ID proof action.',
                error: error instanceof Error ? error.message : String(error)
            });
            console.error('IdProofActionController.idProofAction error:', error);
        }
    }
}  
