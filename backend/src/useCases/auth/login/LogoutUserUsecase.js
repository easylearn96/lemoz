export class UserLogoutUseCase {
    constructor(redisService, jwtService) {
        this._redisService = redisService
        this._jwtService = jwtService
    }
    async clientLogout(input) {
        const { token } = input;
        const decode = this._jwtService.tokenDecode(token)
        const exp = decode?.exp
        console.log(exp)
        if (!exp) throw new Error('Invalid Token')
        const currentTime = Math.floor(Date.now() / 1000);
        const ttl = exp - currentTime;
        console.log(ttl)
        if (ttl > 0) {
            await this._redisService.set(`blacklist:${token}`, ttl, 'true')
            return {
                success: true,
                message: 'User logged out successfully'
            };
        }
        return {
            success: false,
            message: 'Token already expired'
        };
    }
}
