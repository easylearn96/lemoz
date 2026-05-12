export class RefreshTokenUseCase {
    constructor(
        jwtService,
        userRepository,
        adminRepository
    ) {
        this._adminRepository = adminRepository
        this._userRepository = userRepository
        this._jwtService = jwtService
    }

    async execute(token) {
        const payload = this._jwtService.verifyRefreshToken(token, process.env.REFRESH_TOKEN_KEY)
        if (!payload) throw new Error('Invalid or Expired Refresh Token')
        console.log('refresh token here')
        const userId = payload.userId
        const client = await this._userRepository.findById(userId)
        const admin = await this._adminRepository.findById(userId)
        const user = client || admin
        const role = client ? 'user' : admin ? 'admin' : null;
        if (!user || !role) throw new Error('User Not Found')

        const newAccessToken = this._jwtService.createAccessToken(process.env.ACCESS_TOKEN_KEY, userId, role)
        return newAccessToken
    }
}
