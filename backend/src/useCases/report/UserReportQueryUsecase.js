export class UserReportQueryUsecase {
    constructor(
        _reportRepository
    ) {
        this._reportRepository = _reportRepository;
    }

    async getReportsByUser(userId) {
        if (!userId) {
            throw new Error('User ID is required');
        }

        const reports = await this._reportRepository.findReportsByReporter(userId);
        
        return {
            reports: reports.map(report => ({
                _id: report._id,
                reporterId: report.reporterId,
                bookingId: report.bookingId,
                reason: report.reason,
                status: report.status,
                createdAt: report.createdAt
            })),
            total: reports.length
        };
    }

    async getReportsByBooking(bookingId) {
        if (!bookingId) {
            throw new Error('Booking ID is required');
        }

        const reports = await this._reportRepository.findReportsByBooking(bookingId);
        
        return {
            reports: reports.map(report => ({
                _id: report._id,
                reporterId: report.reporterId,
                bookingId: report.bookingId,
                reason: report.reason,
                status: report.status,
                createdAt: report.createdAt
            })),
            total: reports.length
        };
    }
}
