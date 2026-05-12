import { nanoid } from 'nanoid';

export class IdGeneratorService {
   async generateBookingId() {
    const date = new Date().toISOString().slice(2, 10).replace(/-/g, ''); 
    const id = nanoid(6).toUpperCase(); 
    return `BK${date}${id}`;
  }

  async generateWalletId() {
    const date = new Date().toISOString().slice(2, 10).replace(/-/g, ''); 
    const id = nanoid(6).toUpperCase(); 
    return `WL${date}${id}`;
  }

}
