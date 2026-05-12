import { HttpStatus } from "../../../../domain/constants/httpStatus.js";

export class UserWithdrawalController {
    constructor(){}

    async withdrawal(req, res) {
        try {
            res.status(HttpStatus.BAD_REQUEST).json({ message: "Withdrawal functionality not implemented" });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Withdrawal request failed", error });
        }
    }
}
