import { verificationRequestModel } from "../../../framework/database/models/verificationRequestModel.js";
import { userModel } from "../../../framework/database/models/userModel.js";

export class UploadIdProofRepository {
    async uploadImg(idProofUrl, userId) {
        const result = await verificationRequestModel.create({ idProofUrl });
        return await userModel
            .findByIdAndUpdate(
                userId,
                { idproof_id: result._id },
                { new: true }
            ).populate('idproof_id');
    }
}
