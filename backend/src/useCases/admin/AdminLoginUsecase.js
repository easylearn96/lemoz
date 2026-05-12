export class LoginAdminUsecase {
    constructor(adminRepository, hashPassword, adminWalletRepository, jwtService) {
        this._adminRepository = adminRepository
        this._hashPassword = hashPassword
        this._adminWalletRepository = adminWalletRepository
        this._jwtService = jwtService
    }

async handleLogin(input) {
        const admin = await this._adminRepository.findByEmail(input.email)
        if (!admin) throw new Error('admin not exist with this Email')
        if (admin.role !== 'admin') throw new Error('this is not admin')
        const existingWallet = await this._adminWalletRepository.getwalletDetails();
        if (!existingWallet) {
            await this._adminWalletRepository.createWallet()
        }
        const matchPass = await this._hashPassword.comparePassword(input.password, admin.password)
        if (!matchPass) throw new Error('password not match')

            const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY
            const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY
            const accessToken = this._jwtService.createAccessToken(ACCESS_TOKEN_KEY, admin._id?.toString() || "", admin.role)
            const refreshToken = this._jwtService.createRefreshToken(REFRESH_TOKEN_KEY, admin._id?.toString() || "")

            const adminData = {
                _id: admin._id,
                email: admin.email,
                name: admin.name,
                role: admin.role
            }
        return {
           adminData,
           accessToken,
           refreshToken
        };
    }
}
