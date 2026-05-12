export class GetIdProofUscase {
    constructor(_adminRepository){
        this._adminRepository = _adminRepository
    }
    async getIdProof(status, currentPage, itemsPerPage) {
        const result  = await this._adminRepository.getIdProof(status, currentPage, itemsPerPage);
        const {idProof, total} = result || {idProof: [], total: 0};
        const ids = idProof.map((proof) => proof._id.toString());
        
         const idproofs =  await this._adminRepository.findByIdProof(ids);
         return {idproofs, total}
      }
}
