export class EditProfileUsecase {
    constructor(userRepository){
        this._userRepository =userRepository
    }
        
    async handleEditProfile(input) {
        try {
    
            const { name, email, phone, ImageUrl } = input;
            
            const updatedUser = await this._userRepository.updateProfile(
                email || "",
                phone || "",
                name || "",
                ImageUrl || "" 
            );
            
            if (!updatedUser) {
                throw new Error("User not found or update failed");
            }
            
            return {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                profile_image: updatedUser.profile_image,
                isVerified: updatedUser.is_verified_user || false,
                isBlocked: updatedUser.is_blocked || false,
                role: updatedUser.role,
                createdAt: updatedUser.createdAt,
                updatedAt:updatedUser.updatedAt
            };
        } catch (error) {
            console.error('Error in EditProfileUsecase:', error);
            throw error;
        }
    }
}
