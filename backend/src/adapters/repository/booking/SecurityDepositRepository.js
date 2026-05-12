import { setings } from "../../../domain/constants/settings.js";

export class SecurityDepositRepository {
    
    async getSecurityDeposit() {
        return setings.securityDeposit
    }
}
