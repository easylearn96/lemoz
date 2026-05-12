export class UnblockUserUseCase {
    constructor(adminRepository) {
        this._adminRepository = adminRepository
    }
    async unblockUser(input) {
        const isUnblocked = await this._adminRepository.unblockUser(input.userId)
        if (!isUnblocked) throw new Error('Failed to unblock user or user not found')
        
        return {
            success: true,
            message: 'User unblocked successfully',
        };
    }
}
