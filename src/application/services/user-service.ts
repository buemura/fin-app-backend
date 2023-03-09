import { AppError } from "../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../helpers/errors/messages";
import { logger } from "../../helpers/logger";
import { ResponseDto } from "../dtos/response-dto";
import { UserRepository } from "../repositories/user-repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(userId: string): Promise<ResponseDto> {
    logger.info(`Getting user ${userId} details`);

    if (!userId) {
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    const { password, ...result } = user;

    return {
      data: result,
    };
  }
}
