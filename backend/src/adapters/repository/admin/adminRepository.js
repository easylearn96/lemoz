import { userModel } from "../../../framework/database/models/userModel.js";
import { VehicleModel } from "../../../framework/database/models/vehicleModel.js";
import { verificationRequestModel } from "../../../framework/database/models/verificationRequestModel.js";
import { BaseRepository } from "../base/BaseRepo.js";

export class AdminRepository extends BaseRepository {
  constructor() {
    super(userModel);
  }
  async getAllUsers() {
    return userModel.find()
  }

  async SearchUser(search = "", page = 1, limit = 10, filters = {}) {
    const  query = {};
    
    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }
    query.role = 'user'
    // Status filter
    if (filters?.status && filters.status !== 'all') {
      if (filters.status === 'active') {
        query.is_blocked = false;
      } else if (filters.status === 'blocked') {
        query.is_blocked = true;
      }
    }
    
    // Vendor access filter
    if (filters?.vendorAccess && filters.vendorAccess !== 'all') {
      query.vendor_access = filters.vendorAccess === 'true';
    }
    
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      userModel.find(query).skip(skip).limit(limit),
      userModel.countDocuments(query)
    ]);
    return { users, total };
  }

  async blockUser(userId) {
    const blockedUser = await userModel.findByIdAndUpdate(userId, { is_blocked: true }, { new: true })
    return blockedUser?.is_blocked || null
  }
  async unblockUser(userId) {
    const blockedUser = await userModel.findByIdAndUpdate(userId, { is_blocked: false }, { new: true })
    return !blockedUser?.is_blocked || null
  }

  async getPendingVehicle(page = 1, limit = 10, _search) {
  const skip = (page - 1) * limit;
  const  filter = { admin_approve: { $ne: 'accepted' } };
  
  const [vehicles, total] = await Promise.all([
    VehicleModel.find(filter).populate('owner_id').populate('location_id').skip(skip).limit(limit),
    VehicleModel.countDocuments(filter)
  ]);
  return { vehicles, total };
}
  async getApprovedVehicle(search='',page = 1, limit = 10, filters = {}) {
  const skip = (page - 1) * limit;
  console.log(search)
  
  const query = { admin_approve: 'accepted' };
  
  // Search filter
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { brand: { $regex: search, $options: 'i' } }
    ];
  }
  
  // Category filter
  if (filters?.category && filters.category !== 'all') {
    query.category = { $regex: filters.category, $options: 'i' };
  }
  
  // Fuel type filter
  if (filters?.fuelType && filters.fuelType !== 'all') {
    query.fuel_type = { $regex: filters.fuelType, $options: 'i' };
  }
  
  // Transmission filter
  if (filters?.transmission && filters.transmission !== 'all') {
    query.transmission = { $regex: filters.transmission, $options: 'i' };
  }
  
  const [vehicles, total, totalCount] = await Promise.all([
    VehicleModel.find(query).populate('owner_id').populate('location_id').skip(skip).limit(limit),
    VehicleModel.countDocuments(query),
    VehicleModel.countDocuments()
  ]);
  return { vehicles, total, totalCount };
}

 async getIdProof(status, page, limit) {

    const skip = (page - 1) * limit;
    const [idProofDocs,total]= await Promise.all([

        verificationRequestModel.find({status}).skip(skip).limit(limit),
        verificationRequestModel.countDocuments({status})
    ])
    
    const idProof = idProofDocs.map(doc => ({
        _id: doc._id.toString(),
        idProofUrl: doc.idProofUrl,
        status: doc.status,
        reason: doc.reason,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt
    }));
    
    return {idProof,total}
    }

    async findByIdProof(idProof_id){
      return await userModel.find({idproof_id:{$in:idProof_id}}).populate('idproof_id')
    }
    async idProofUprove(idProof_id,owner_id){
     const success =  await verificationRequestModel.findByIdAndUpdate(idProof_id,{status:'approved'})
     if(success){
      await userModel.findByIdAndUpdate(owner_id,{is_verified_user:true})
     }
     return !!success
    }
    async idProofReject(idProof_id,reason){
     const success =  await verificationRequestModel.findByIdAndUpdate(idProof_id,{status:'rejected',reason})
     return !!success
    }

    async setVeifedUser(userId) {
      const success = await userModel.findByIdAndUpdate(userId,{is_verified_user:true})
      return !!success
 
    }
    async vendorAccess(userId, vendor_access) {
      const success = await userModel.findByIdAndUpdate(userId, { vendor_access:!vendor_access })
      return !!success
    }
}
