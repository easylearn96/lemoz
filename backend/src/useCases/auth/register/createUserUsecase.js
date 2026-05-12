export class CreateUserUsecase {
    constructor(_userRepository, _hashPassword, _walletRepository){
        this._hashPassword = _hashPassword
        this._userRepository = _userRepository
        this._walletRepository = _walletRepository
    }

    async createUser(payload) {

        const existUser = await this._userRepository.findByEmail(payload.email)
        if(existUser)throw new Error('user already exist')
            const {password,email,name,phone} = payload

        let hashPassword = null
        if(password)hashPassword = await this._hashPassword.hashPassword(password)

        const newUser = await this._userRepository.create({
            name,
            phone,
            email,
            password:hashPassword ?? '',
            role: 'user',
            is_verified_user: false,
            last_login: new Date()
        })

if (!newUser) throw new Error('Error while creating user')

// Create wallet for the new user
if (newUser._id) {
    await this._walletRepository.create({user_id:newUser._id.toString(),balance:0,is_frozen:false,transactions:[]})
}

const returnUser ={
    _id: newUser._id?.toString() || '',
    email: newUser.email,
    name: newUser.name,
    phone: newUser.phone,
    role: newUser.role,
    is_verified_user: newUser.is_verified_user,
    last_login: newUser.last_login,
    vendor_access: newUser.vendor_access,
    googleVerification: newUser.googleVerification
} 
     return returnUser
    }
}
