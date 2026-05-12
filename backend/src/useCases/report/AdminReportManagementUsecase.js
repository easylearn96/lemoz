export class AdminReportManagementUsecase {
    constructor(
        _reportRepository
    ) {
        this._reportRepository = _reportRepository;
    }

    async updateReportStatus(input) {
        if (!input.reportId || !input.status) {
            throw new Error('Report ID and status are required');
        }

        const updatedReport = await this._reportRepository.updateReportStatus(input.reportId, input.status);
        
        if (!updatedReport) {
            return { report: null };
        }

        return {
            report: {
                _id: updatedReport._id,
                reporterId: updatedReport.reporterId,
                bookingId: updatedReport.bookingId,
                reason: updatedReport.reason,
                status: updatedReport.status,
                createdAt: updatedReport.createdAt
            }
        };
    }
}
