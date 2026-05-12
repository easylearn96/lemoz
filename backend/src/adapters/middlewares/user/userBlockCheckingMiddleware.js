import { HttpStatus } from "../../../domain/constants/httpStatus.js";

export const UserBlockCheckingMiddleware = (redisService, userRepository) => {
  return async (req, res, next) => {
      const user = req.user;
      // console.log(user)
      let isBlocked = await redisService.get(`user:${user.role}:${user.userId}`);
      if (!isBlocked) {
        isBlocked = await userRepository.findStatusForMidddlewere(user.userId);
        await redisService.set(`user:${user._id}:${user.role}`,300,String(isBlocked));
      }
      if (isBlocked === 'true') {
         res.status(HttpStatus.BAD_REQUEST).json({ message: "User is blocked.", });
         return
      }
      next();
  };
};
