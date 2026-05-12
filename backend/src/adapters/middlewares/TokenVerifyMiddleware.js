import { HttpStatus } from "../../domain/constants/httpStatus.js";

export const verifyTokenAndCheckBlackList = (TokenService) => {
    return async (req, res, next) => {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Access denied. No token provided.' });
            return
        }
        const token = authHeader.split(' ')[1]
        try {
            const isBlacklisted = await TokenService.checkTokenBlacklist(token)
            if (isBlacklisted) {
                res.status(HttpStatus.FORBIDDEN).json({ message: "This token is blacklisted", error: "This token is blacklisted" })
                return
            }
            const decoded = await TokenService.verifyToken(token);
            // console.log('decoded',decoded);
            req.user = decoded
            next()
        } catch (error) {
            res.status(HttpStatus.FORBIDDEN).json({ message: 'Invalid token.', error: error instanceof Error ? error.message : 'invalid Token' });

        }
    }

}
