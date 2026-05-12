export class GetUserUsecase {
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }

    async getUser(input) {
        const { userId } = input;
        if (!userId) {
            throw new Error("User ID is required");
        }
        const user = await this._userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        
        return {
            _id: user._id?.toString(),
            email: user.email,
            name: user.name,
            phone: user.phone,
            idproof_id: JSON.parse(JSON.stringify(user.idproof_id)),
            profile_image: user.profile_image,
            role: user.role,
            is_blocked: user.is_blocked,
            is_verified_user: user.is_verified_user,
            last_login: user.last_login,
            vendor_access: user.vendor_access,
            googleVerification: user.googleVerification
        };
    }
}
