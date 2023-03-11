import { AppError } from "../../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../../helpers/errors/messages";
import { logger } from "../../../helpers/logger";
import { UpdateAccountDto } from "../../dtos/account-dto";
import { ResponseDto } from "../../dtos/response-dto";
import { AccountRepository } from "../../repositories/account-repository";

export class UpdateAccountUsecase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute({
    accountId,
    name,
    balance,
    icon,
  }: UpdateAccountDto): Promise<ResponseDto> {
    if (!accountId) {
      logger.info(`[UpdateAccountUsecase]: Missing required parameters`);
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      logger.info(`[UpdateAccountUsecase]: Account ${accountId} not found`);
      throw new AppError(ERROR_MESSAGE.ACCOUNT_NOT_FOUND);
    }

    logger.info(`[UpdateAccountUsecase]: Updating account ${accountId}`);
    const result = await this.accountRepository.update({
      accountId,
      name,
      balance: Number(balance),
      icon,
    });

    logger.info(
      `[UpdateAccountUsecase]: Successfully updated account ${accountId}`
    );
    return {
      data: {
        id: result?.id,
      },
    };
  }
}
