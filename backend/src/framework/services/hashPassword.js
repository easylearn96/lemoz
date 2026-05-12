import bcrypt from 'bcrypt'
export class HashPassword {
 async hashPassword(password) {
        return await bcrypt.hash(password,10)
    }

 async comparePassword(password, passwordInDb) {
        return await bcrypt.compare(password, passwordInDb)
    }
}
