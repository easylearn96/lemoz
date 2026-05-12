export const setCookie = (res, refreshToken) => {
    res.cookie('refreshtoken', refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000  
    })
}
