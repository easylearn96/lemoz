export class TokenService {
    constructor(redisService, jwtService, accessSecretKey) {
        this._redisService = redisService
        this._jwtService = jwtService
        this._accessSecretKey = accessSecretKey
    }
    async checkTokenBlacklist(token) {
        const result = await this._redisService.get(`blacklist:${token}`)
        return !!result
    }

    verifyToken(token) {
        return this._jwtService.verifyAccessToken(token, this._accessSecretKey)
    }
}
