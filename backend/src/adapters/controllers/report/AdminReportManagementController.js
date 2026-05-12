import { HttpStatus } from "../../../domain/constants/httpStatus.js";

export class AdminReportManagementController {
    constructor(_adminReportManagementUseCase) {
        this._adminReportManagementUseCase = _adminReportManagementUseCase
    }

    async updateReportStatus(req, res) {
        try {
            const { reportId } = req.params;
            const { status } = req.body;

            if (!reportId || !status) {
                res.status(HttpStatus.BAD_REQUEST).json({
                    success: false,
                    message: "Report ID and status are required"
                });
                return;
            }

            const result = await this._adminReportManagementUseCase.updateReportStatus({
                reportId,
                status
            });

            if (!result.report) {
                res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: "Report not found"
                });
                return;
            }

            res.status(HttpStatus.OK).json({
                success: true,
                message: "Report status updated successfully",
                data: result.report
            });
        } catch (error) {
            console.error("Error updating report status:", error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Failed to update report status"
            });
        }
    }
}
