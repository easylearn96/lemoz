export class VehicleUpproveUsecase {
    constructor(
      _vehicleRepository,
      _createNotificationUsecase,
    ) {
        this._vehicleRepository = _vehicleRepository;
        this._createNotificationUsecase = _createNotificationUsecase;
    }
    async approveVehicle(input) {
        try {
            // Get vehicle details to find the owner
            const vehicle = await this._vehicleRepository.findById(input.id);
            if (!vehicle) {
                throw new Error('Vehicle not found');
            }

            let notificationMessage = '';
            let notificationSent = false;

            if (input.action === 'accepted') {
                await this._vehicleRepository.approveVehicle(input.id, input.action);
                notificationMessage = `🎉 Great news! Your vehicle "${vehicle.name}" has been approved and is now live on RYDIO. You can start receiving bookings!`;
                
                // Send approval notification
                const notification = {
                    from: "Admin", 
                    to: vehicle.owner_id,
                    message: notificationMessage,
                    read: false,
                    senderModel: 'owner',
                    receiverModel: 'owner',
                    type: 'success'
                };

                await this._createNotificationUsecase.createNotification(notification);
                notificationSent = true
                

                return {
                    success: true,
                    message: 'Vehicle approved successfully'
                };
            } else {
                await this._vehicleRepository.rejectVehicle(input.id, input.action, input.reason);
                notificationMessage = `❌ Your vehicle "${vehicle.name}" has been rejected. Reason: ${input.reason || 'No specific reason provided'}. Please review and resubmit with the necessary corrections.`;
                
                // Send rejection notification
                const notification = {
                    from: "Admin",
                    to: vehicle.owner_id,
                    message: notificationMessage,
                    read: false,
                    senderModel: 'owner',
                    receiverModel: 'owner',
                    type: 'info'
                };

                await this._createNotificationUsecase.createNotification(notification);
                notificationSent = true;

               
                return {
                    success: true,
                    message: 'Vehicle rejected successfully'
                };
            } 
        } catch (error) {
            console.error('Error in vehicle approval process:', error);
            throw error;
        }
    }
}
