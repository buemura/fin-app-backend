import { AppError } from "../../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../../helpers/errors/messages";
import { logger } from "../../../helpers/logger";
import { ResponseDto } from "../../dtos/response-dto";
import { AccountRepository } from "../../repositories/account-repository";

export class DeleteAccountUsecase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(accountId: string): Promise<ResponseDto> {
    if (!accountId) {
      logger.info(`[DeleteAccountUsecase]: Missing required parameter`);
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      logger.info(`[DeleteAccountUsecase]: Account ${accountId} not found`);
      throw new AppError(ERROR_MESSAGE.ACCOUNT_NOT_FOUND);
    }

    logger.info(`[DeleteAccountUsecase]: Deleting account ${accountId}`);

    const result = await this.accountRepository.delete(accountId);

    logger.info(
      `[DeleteAccountUsecase]: Successfully deleted account ${accountId}`
    );

    return {
      data: {
        id: result?.id,
      },
    };
  }
}
