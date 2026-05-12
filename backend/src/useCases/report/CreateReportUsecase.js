import { ReportStatus } from "../../domain/entities/ReportEntities.js";

export class CreateReportUsecase {
    constructor(reportRepository) {
        this._reportRepository = reportRepository;
    }

    async createReport(input) {
        const { reporterId, bookingId, ownerId, reason } = input;

        // Validate input
        if (!reporterId || !bookingId || !ownerId || !reason) {
            throw new Error('All fields are required: reporterId, bookingId, ownerId, reason');
        }

        // Check if a report already exists for this booking by this reporter
        const existingReports = await this._reportRepository.findReportsByBooking(bookingId);
        const duplicateReport = existingReports.find(report => 
            report.reporterId === reporterId
        );

        if (duplicateReport) {
            throw new Error('You have already reported this booking');
        }

        // Create new report
        const newReport = {
            reporterId,
            bookingId,
            ownerId,
            reason,
            status: ReportStatus.PENDING,
        };

        const createdReport = await this._reportRepository.create(newReport);

        if (!createdReport) {
            throw new Error('Failed to create report');
        }

        return {
            _id: createdReport._id,
            reporterId: createdReport.reporterId,
            bookingId: createdReport.bookingId,
            reason: createdReport.reason,
            status: createdReport.status,
            createdAt: createdReport.createdAt
        };
    }
}
