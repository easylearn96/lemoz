export class UploadIdProofUsecase {
    constructor(uploadIdProofRepository){
        this._uploadIdProofRepository= uploadIdProofRepository
    }
    
    async uploadProof(input) {
        try {
            const { userId, imageUrl } = input;
            const updatedUser = await this._uploadIdProofRepository.uploadImg(imageUrl, userId);
            
            if (!updatedUser) {
                throw new Error("User not found or upload failed");
            }
            
            return {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                isVerified: updatedUser.is_verified_user || false,
                isBlocked: updatedUser.is_blocked || false,
                role: updatedUser.role,
                idProofUrl: imageUrl,
                verificationStatus: 'pending',
                createdAt: updatedUser.createdAt,
                updatedAt: updatedUser.updatedAt
            };
        } catch (error) {
            console.error('Error in UploadIdProofUsecase:', error);
            throw error;
        }
    }

}
