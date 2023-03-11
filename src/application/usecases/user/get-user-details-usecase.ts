import { AppError } from "../../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../../helpers/errors/messages";
import { logger } from "../../../helpers/logger";
import { ResponseDto } from "../../dtos/response-dto";
import { UserRepository } from "../../repositories/user-repository";

export class GetUserDetailsUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<ResponseDto> {
    if (!userId) {
      logger.info(`[GetUserDetailsUsecase]: Missing required parameter`);
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    logger.info(`[GetUserDetailsUsecase]: Getting user ${userId} details`);

    const user = await this.userRepository.findById(userId);
    if (!user) {
      logger.info(`[GetUserDetailsUsecase]: User ${userId} not found`);
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    const { password, ...result } = user;

    logger.info(
      `[GetUserDetailsUsecase]: Successfully got user ${userId} details`
    );

    return {
      data: result,
    };
  }
}
