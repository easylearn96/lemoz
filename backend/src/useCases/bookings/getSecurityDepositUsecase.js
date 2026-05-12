import { setings } from "../../domain/constants/settings.js";

export class GetSecurityDepositUsecase {
  constructor() {}

  async getSecurityDeposit() {
    try {
      return {
        security_deposit: setings.securityDeposit
      };
    } catch (error) {
      console.error('Error getting security deposit:', error);
      throw error;
    }
  }
}
