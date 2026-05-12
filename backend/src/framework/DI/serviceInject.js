import { RefreshTokenController } from "../../adapters/controllers/auth/RefreshTokenController.js";
import { TokenTimeExpiryValidationMiddleware } from "../../adapters/middlewares/tokenTimeExpiryValidationMiddleware.js";
import { verifyTokenAndCheckBlackList } from "../../adapters/middlewares/TokenVerifyMiddleware.js";
import { UserBlockCheckingMiddleware } from "../../adapters/middlewares/user/userBlockCheckingMiddleware.js";
import { AdminRepository } from "../../adapters/repository/admin/adminRepository.js";
import { UserRepository } from "../../adapters/repository/user/userRepository.js";
import { RefreshTokenUseCase } from "../../useCases/auth/RefreshTokenUsecase.js";
import { IdGeneratorService } from "../services/idGenerotorSevice.js";
import { JwtService } from "../services/jwtService.js";
import { RedisService } from "../services/redisService.js";
import { TokenService } from "../services/tokenService.js";

const redisService =new  RedisService()
const userRepository =new UserRepository()
const jwtService = new JwtService()
const adminRepository = new AdminRepository()
const accessSecretKey = process.env.ACCESS_TOKEN_KEY 
const tokenService = new TokenService(redisService,jwtService,accessSecretKey)
//-----------user-block-checker
export const injectedUserBlockChecker = UserBlockCheckingMiddleware(redisService,userRepository)


//-=----------verify-token-----------
export const injectedVerfyToken = verifyTokenAndCheckBlackList(tokenService)

//-----------refresh token controller-----------

const refreshTokenUseCase = new RefreshTokenUseCase(jwtService,userRepository,adminRepository)
export const refreshTokenController = new RefreshTokenController(refreshTokenUseCase)
export const tokenTimeExpiryValidationMiddleware = TokenTimeExpiryValidationMiddleware(jwtService)


export const idGeneratorService = new IdGeneratorService();
