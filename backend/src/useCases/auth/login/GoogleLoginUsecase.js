export class GoogleLoginUsecase {
    constructor(userRepository, walletRepository, jwtService, redisService) {
        this._userRepository = userRepository
        this._walletRepository = walletRepository
        this._jwtService = jwtService
        this._redisService = redisService
    }
    async googleLogin(input) {
        const { email, name, profile_image, googleVerification } = input;
        
        const user = {
            email,
            name,
            profile_image,
            googleVerification,
            role: 'user',
            is_verified_user: false,
            last_login: new Date()
        };
        
        const existingUser = await this._userRepository.findByEmail(email)
        
        let finalUser;
        
        if (existingUser) {
            if (existingUser.is_blocked) throw new Error('user is blocked')
            
            // Create wallet if doesn't exist
            if (existingUser._id) {
                const existingWallet = await this._walletRepository.getWalletByUserId(existingUser._id.toString());
                if (!existingWallet) {
                    await this._walletRepository.create({user_id:existingUser._id.toString(),balance:0,is_frozen:false,transactions:[]})
                }
            }
            
            finalUser = existingUser;
        }
        else {
            const createUser = await this._userRepository.googleLogin(user)
            if (!createUser) throw new Error('error while creating new user using google login')
            
            // Create a wallet for the new user
            if (createUser._id) {
                await this._walletRepository.create({user_id:createUser._id.toString(),balance:0,is_frozen:false,transactions:[]})
            }
            
            finalUser = createUser;
        }
        
        // Generate tokens after we have the final user
        const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
        const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY;

        const accessToken = this._jwtService.createAccessToken(
            ACCESS_TOKEN_KEY,
            finalUser._id?.toString() || "",
            finalUser.role
        );
        const refreshToken = this._jwtService.createRefreshToken(
            REFRESH_TOKEN_KEY,
            finalUser._id?.toString() || ""
        );
        await this._redisService.set(
            `user:${finalUser.role}:${finalUser._id}`,
            15 * 60,
            JSON.stringify(finalUser.is_blocked)
        );
        
        const createdUser = {
            _id: finalUser._id?.toString(),
            email: finalUser.email,
            name: finalUser.name,
            phone: finalUser.phone,
            idproof_id: JSON.parse(JSON.stringify(finalUser.idproof_id)),
            profile_image: finalUser.profile_image,
            role: finalUser.role,
            is_blocked: finalUser.is_blocked,
            is_verified_user: finalUser.is_verified_user,
            last_login: finalUser.last_login,
            vendor_access: finalUser.vendor_access,
            googleVerification: finalUser.googleVerification
        };
        
        return { createdUser, accessToken, refreshToken };
    }
}
