export class EnableChatUsecase {
    constructor(bookingRepository) {
        this._bookingRepository = bookingRepository;
    }

    async checkBookingExists(userId, ownerId) {
        try {
            const booking = await this._bookingRepository.checkBookingExistsBetweenUserAndOwner(userId, ownerId);
            
            if (booking) {
                return {
                    canChat: true,
                    message: "Chat enabled - Active booking found between user and owner"
                };
            } else {
                return {
                    canChat: false,
                    message: "Chat not available - No active booking found between user and owner"
                };
            }
        } catch (error) {
            console.error("Error checking booking exists:", error);
            return {
                canChat: false,
                message: "Error checking booking status"
            };
        }
    }
}
