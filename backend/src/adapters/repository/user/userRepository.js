import { userModel } from "../../../framework/database/models/userModel.js";
import { BaseRepository } from "../base/BaseRepo.js";

export class UserRepository extends BaseRepository {
    constructor() {
        super(userModel);
    }
    async findByEmail(email) {
    return await userModel.findOne({email}).populate('idproof_id')
    }
    async findById(_id) {
    return await userModel.findOne({_id,role:'user'}).populate('idproof_id')
    }
    
    async googleLogin(user) {
        return await userModel.create(user)
    }
      async changePassword(id, password) {
     return await userModel.findByIdAndUpdate(id, { password }, { new: true })
      }
      async updateProfile(email, phone, name, profile_image) {
     return await userModel.findOneAndUpdate({email}, { phone,name,profile_image }, { new: true }).populate('idproof_id')
      }

      async findStatusForMidddlewere(userId) {
          const user = await userModel.findById(userId)
          if(!user)throw new Error('no user found this id')
            return String(user.is_blocked)
      }

      // Dashboard Analytics Methods
      async getTotalUsersCount() {
          return await userModel.countDocuments({ role: 'user' });
      }

      async getActiveUsersCount() {
          return await userModel.countDocuments({ role: 'user', is_blocked: false });
      }

      async getBlockedUsersCount() {
          return await userModel.countDocuments({ role: 'user', is_blocked: true });
      }

      async getUserActivityChartData() {
          const [totalUsers, activeUsers, blockedUsers] = await Promise.all([
              this.getTotalUsersCount(),
              this.getActiveUsersCount(),
              this.getBlockedUsersCount()
          ]);
          
          // Calculate percentages for chart heights (0-100)
          const activePercentage = totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0;
          const blockedPercentage = totalUsers > 0 ? Math.round((blockedUsers / totalUsers) * 100) : 0;
          
          return [
              { height: activePercentage, color: '#10B981' }, // Green for active users
              { height: blockedPercentage, color: '#EF4444' }  // Red for blocked users
          ];
      }

      async getPendingVendorAccessRequests() {
          return await userModel.countDocuments({ 
              role: 'user', 
              vendor_access_requested: true,
              vendor_access: false 
          });
      }

      async getPendingVerificationRequests() {
          return await userModel.countDocuments({ 
              role: 'user', 
              verification_status: 'pending' 
          });
      }

      async getVerifiedUsersCount() {
          return await userModel.countDocuments({ 
              role: 'user', 
              verification_status: 'verified' 
          });
      }
    }
