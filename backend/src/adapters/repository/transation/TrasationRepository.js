import { transactionModel } from "../../../framework/database/models/transactionModel.js";
import { BaseRepository } from "../base/BaseRepo.js";

export class TrasationRepository extends BaseRepository {
    constructor() {
        super(transactionModel);
    }
}
