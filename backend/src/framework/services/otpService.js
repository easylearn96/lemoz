import NodeCache from "node-cache";

export class OtpService {
    constructor(){
        this._cache = new NodeCache({ stdTTL: 300 });
    }
    genarateOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    async storeOtp(email, otp) {
        this._cache.set(email,otp,300)
    }

    async verifyOtp(email, otp) {
        console.log(email,otp,'emailotp')
        const cachedOtp = this._cache.get(email);
         console.log(cachedOtp,'cachedOtp')
        if (cachedOtp && cachedOtp == otp) {
            this._cache.del(email); 
            return true;
        }
        return false;
    }
}
