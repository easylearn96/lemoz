export class AdminReportQueryUsecase {
    constructor(
        _reportRepository,
        _userRepository,
        _bookingRepository,
        _vehicleRepository
    ) {
        this._reportRepository = _reportRepository;
        this._userRepository = _userRepository;
        this._bookingRepository = _bookingRepository;
        this._vehicleRepository = _vehicleRepository;
    }

    async getAllReportsWithFilters(filters) {
        const result = await this._reportRepository.getAllReportsWithFilters(filters);
        
        // Fetch user data for reporters and owners, plus booking and vehicle data
        const enrichedReports = await Promise.all(
            result.reports.map(async (report) => {
                const [reporter, booking] = await Promise.all([
                    this._userRepository.findById(report.reporterId),
                    this._bookingRepository.findByBookingId(report.bookingId)
                ]);

                let owner = null;
                let vehicle = null;

                if (booking) {
                    // Get vehicle data
                    const vehicleId = typeof booking.vehicle_id === 'string' ? booking.vehicle_id : booking.vehicle_id.toString();
                    vehicle = await this._vehicleRepository.getVehicle(vehicleId);
                    
                    // Get owner data from vehicle
                    if (vehicle && vehicle.owner_id) {
                        const ownerId = typeof vehicle.owner_id === 'string' ? vehicle.owner_id : vehicle.owner_id.toString();
                        owner = await this._userRepository.findById(ownerId);
                    }
                }

                return {
                    _id: report._id,
                    reporterId: report.reporterId,
                    bookingId: report.bookingId,
                    reason: report.reason,
                    status: report.status,
                    createdAt: report.createdAt,
                    updatedAt: report.updatedAt,
                    reporter: reporter ? {
                        _id: reporter._id,
                        name: reporter.name,
                        email: reporter.email,
                        profile_image: reporter.profile_image
                    } : null,
                    owner: owner ? {
                        _id: owner._id,
                        name: owner.name,
                        email: owner.email,
                        profile_image: owner.profile_image
                    } : null,
                    booking: booking ? {
                        _id: booking._id,
                        booking_id: booking.booking_id,
                        vehicle: vehicle ? {
                            _id: vehicle._id,
                            name: vehicle.name,
                            image: vehicle.image_urls && vehicle.image_urls.length > 0 ? vehicle.image_urls[0] : undefined
                        } : null
                    } : null
                };
            })
        );
        
        return {
            reports: enrichedReports,
            total: result.total,
            currentPage: result.currentPage,
            totalPages: result.totalPages
        };
    }

    async getReportsStats() {
        return await this._reportRepository.getReportsStats();
    }

    async getReportById(input) {
        if (!input.reportId) {
            throw new Error('Report ID is required');
        }

        const report = await this._reportRepository.findReportById(input.reportId);
        
        if (!report) {
            return { report: null };
        }

        // Fetch user data for reporter and owner, plus booking and vehicle data
        const [reporter, booking] = await Promise.all([
            this._userRepository.findById(report.reporterId),
            this._bookingRepository.findByBookingId(report.bookingId)
        ]);

        let owner = null;
        let vehicle = null;

        if (booking) {
            // Get vehicle data
            const vehicleId = typeof booking.vehicle_id === 'string' ? booking.vehicle_id : booking.vehicle_id.toString();
            vehicle = await this._vehicleRepository.getVehicle(vehicleId);
            
            // Get owner data from vehicle
            if (vehicle && vehicle.owner_id) {
                const ownerId = typeof vehicle.owner_id === 'string' ? vehicle.owner_id : vehicle.owner_id.toString();
                owner = await this._userRepository.findById(ownerId);
            }
        }

        return {
            report: {
                _id: report._id,
                reporterId: report.reporterId,
                bookingId: report.bookingId,
                reason: report.reason,
                status: report.status,
                createdAt: report.createdAt,
                updatedAt: report.updatedAt,
                reporter: reporter ? {
                    _id: reporter._id,
                    name: reporter.name,
                    email: reporter.email,
                    profile_image: reporter.profile_image
                } : null,
                owner: owner ? {
                    _id: owner._id,
                    name: owner.name,
                    email: owner.email,
                    profile_image: owner.profile_image
                } : null,
                booking: booking ? {
                    _id: booking._id,
                    booking_id: booking.booking_id,
                    vehicle: vehicle ? {
                        _id: vehicle._id,
                        name: vehicle.name,
                        image: vehicle.image_urls && vehicle.image_urls.length > 0 ? vehicle.image_urls[0] : undefined
                    } : null
                } : null
            }
        };
    }
}
