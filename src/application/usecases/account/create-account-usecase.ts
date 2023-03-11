import { AppError } from "../../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../../helpers/errors/messages";
import { logger } from "../../../helpers/logger";
import { CreateAccountDto } from "../../dtos/account-dto";
import { ResponseDto } from "../../dtos/response-dto";
import { AccountRepository } from "../../repositories/account-repository";
import { UserRepository } from "../../repositories/user-repository";

export class CreateAccountUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository
  ) {}

  async execute({
    userId,
    name,
    balance,
    icon,
  }: CreateAccountDto): Promise<ResponseDto> {
    if (!userId || !name) {
      logger.info(`[CreateAccountUsecase]: Missing required parameters`);
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      logger.info(`[CreateAccountUsecase]: User ${userId} not found`);
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    logger.info(`[CreateAccountUsecase]: Creating account`);
    const result = await this.accountRepository.create({
      userId,
      name,
      balance: balance ? Number(balance) : 0,
      icon: icon ? String(icon) : "",
    });

    logger.info(`[CreateAccountUsecase]: Successfully created account`);

    return {
      data: {
        id: result.id,
      },
    };
  }
}
