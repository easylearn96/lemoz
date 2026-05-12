import { HttpStatus } from "../../../domain/constants/httpStatus.js";

export class SearchUserController {
    constructor(searchUserUsecase) {
        this._searchUserUsecase = searchUserUsecase
    }
    async searchUser(req, res) {
        try {
            const { search, page, limit, status, vendorAccess } = req.query;
            const searchStr = String(search);
            const pageNum = Number(String(page))
            const limitNum = Number(String(limit))
            
            const filters = {
                status: String(status || 'all'),
                vendorAccess: String(vendorAccess || 'all')
            };

            const users = await this._searchUserUsecase.searchUser({
                search: searchStr, 
                page: pageNum, 
                limit: limitNum,
                filters
            });
            res.status(HttpStatus.OK).json(users)

        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'An error occurred while searching for users.',
                error: error instanceof Error ? error.message : String(error)
            });
            console.error('SearchUserController.searchUser error:', error);
        }
    }

}
