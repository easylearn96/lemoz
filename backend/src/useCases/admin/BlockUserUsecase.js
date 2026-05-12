export class BlockUserUseCase {
    constructor(adminRepository) {
        this._adminRepository = adminRepository
    }
    async blockUser(input) {
        const blockedClient = await this._adminRepository.blockUser(input.userId)
        if (!blockedClient) throw new Error('No user found with this ID')
        
        return {
            success: true,
            message: 'User blocked successfully',
        };
    }
}
