export class CreateNotificationUsecase {
    constructor(
        _notificationRepository,
        _notificationManagerAdapter
    ) {
        this._notificationRepository = _notificationRepository;
        this._notificationManagerAdapter = _notificationManagerAdapter;
    }

    async createNotification(notification) {
        const newNotification = await this._notificationRepository.create(notification);
     console.log(notification,'notification')
        if(notification.from === "Admin"){
            console.log('nisideeee')
            const liveNotification = {
                _id: newNotification._id || '',
                from: {
                    _id: "admin",
                    name: "RYDIO Admin",
                    profileImage: ""
                },
                to: newNotification.to.toString(),
                message: newNotification.message,
                type: "warning"
            };
            this._notificationManagerAdapter.sendLiveNotification(liveNotification);
        }
        
        return newNotification
    }
}
