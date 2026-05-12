import { HttpStatus } from "../../domain/constants/httpStatus.js"

export const checkRoleBaseMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const user = req.user
        // console.log('userrrrrrrrrrrrrrrrrr',user)
        if (!user || allowedRoles!==user.role) {
            console.log("raole based called ")
            res.status(HttpStatus.FORBIDDEN).json({ error: "Access Denied:UnAuthorized role" })
            return
        }
        next()
    }
}
