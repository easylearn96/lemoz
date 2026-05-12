import jwt from 'jsonwebtoken'

export class JwtService {
    createAccessToken(accessSecretKey, userId, role) {
        return jwt.sign({ userId, role }, accessSecretKey, { expiresIn: '15m' })
    }

    createRefreshToken(refreshSecretKey, userId) {
        return jwt.sign({ userId }, refreshSecretKey, { expiresIn: '1d' })
    }
    verifyAccessToken(accessToken, accessSecretKey) {
        try {
            return jwt.verify(accessToken, accessSecretKey)
        } catch (error) {
            console.log('error while verify AccessToken ', error)
            return null
        }
    }
    verifyRefreshToken(refreshToken, refreshSecretKey) {
        try {
            return jwt.verify(refreshToken, refreshSecretKey)
        } catch {
            return null
        }
    }
    tokenDecode(accessToken) {
        return jwt.decode(accessToken)
    }
}
