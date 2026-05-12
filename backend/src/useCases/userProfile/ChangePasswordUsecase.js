export class ChangePassword {
    constructor(userRepository,hashPassword){
        this._userRepository =userRepository
        this._hashPassword = hashPassword
    }
        
    async handleChangePassword(input) {
        const { current, newPass, _id } = input;
        const user = await this._userRepository.findById(_id);
        if(!user?.password) throw new Error('user not found');
           
        const verifyPass = await this._hashPassword.comparePassword(current, user.password);
        if(!verifyPass) throw new Error('current password not match');
        if (current === newPass) throw new Error('New password must be different from the current password');
        
        const updatedUser = await this._userRepository.changePassword(_id, newPass);
        if (!updatedUser) throw new Error('Failed to update password');
        
        return {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            isVerified: updatedUser.is_verified_user || false,
            isBlocked: updatedUser.is_blocked || false,
            role: updatedUser.role,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt
        };
    }
}
