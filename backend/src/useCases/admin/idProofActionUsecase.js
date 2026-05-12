export class IdProofActionUsecase {
    constructor(_adminRepository){
        this._adminRepository = _adminRepository
    }

    async setAction(input) {
        if(input.action == 'approved'){
            await this._adminRepository.setVeifedUser(input.owner_id)
            await this._adminRepository.idProofUprove(input.idProof_id, input.owner_id)
            return {
                success: true,
                message: 'ID proof approved successfully'
            };
        }
        await this._adminRepository.idProofReject(input.idProof_id, input.reason)
        return {
            success: true,
            message: 'ID proof rejected successfully'
        };
    }
} 
