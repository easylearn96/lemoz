import { reportModel } from "../../../framework/database/models/reportModel.js";
import { BaseRepository } from "../base/BaseRepo.js";

export class ReportRepository extends BaseRepository {
    constructor() {
        super(reportModel);
    }

    async findReportsByReporter(reporterId) {
        return await reportModel.find({ reporterId }).sort({ createdAt: -1 });
    }


    async findReportsByBooking(bookingId) {
        return await reportModel.find({ bookingId }).sort({ createdAt: -1 });
    }

    async updateReportStatus(id, status) {
        const updatedReport = await reportModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        return updatedReport;
    }

    async getAllReports() {
        return await reportModel.find().sort({ createdAt: -1 });
    }

    async getAllReportsWithFilters(filters) {
        const query = {};

        // Status filter
        if (filters.status) {
            query.status = filters.status;
        }

        // Date range filter
        if (filters.dateFrom || filters.dateTo) {
            query.createdAt = {};
            if (filters.dateFrom) {
                query.createdAt.$gte = new Date(filters.dateFrom);
            }
            if (filters.dateTo) {
                query.createdAt.$lte = new Date(filters.dateTo);
            }
        }

        // Search filter (search in reason field)
        if (filters.search) {
            query.$or = [
                { reason: { $regex: filters.search, $options: 'i' } },
                { bookingId: { $regex: filters.search, $options: 'i' } }
            ];
        }

        const skip = (filters.page - 1) * filters.limit;
        const total = await reportModel.countDocuments(query);
        const totalPages = Math.ceil(total / filters.limit);

        const reports = await reportModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(filters.limit);

        return {
            reports: reports.map(report => report.toObject()),
            total,
            currentPage: filters.page,
            totalPages
        };
    }

    async getReportsStats() {
        const [total, pending, inReview, resolved, dismissed] = await Promise.all([
            reportModel.countDocuments(),
            reportModel.countDocuments({ status: 'Pending' }),
            reportModel.countDocuments({ status: 'In Review' }),
            reportModel.countDocuments({ status: 'Resolved' }),
            reportModel.countDocuments({ status: 'Dismissed' })
        ]);

        return {
            total,
            pending,
            inReview,
            resolved,
            dismissed
        };
    }

    async findReportById(id) {
         return await reportModel.findById(id)
    }
}
