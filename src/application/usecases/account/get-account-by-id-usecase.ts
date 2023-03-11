import { AppError } from "../../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../../helpers/errors/messages";
import { logger } from "../../../helpers/logger";
import { ResponseDto } from "../../dtos/response-dto";
import { AccountRepository } from "../../repositories/account-repository";

export class GetAccountByIdUsecase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(accountId: string): Promise<ResponseDto> {
    if (!accountId) {
      logger.info(`[GetAccountByIdUsecase]: Missing required parameters`);
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    logger.info(`[GetAccountByIdUsecase]: Getting account ${accountId}`);
    const result = await this.accountRepository.findById(accountId);

    logger.info(
      `[GetAccountByIdUsecase]: Successfully got account ${accountId}`
    );
    return {
      data: result,
    };
  }
}
