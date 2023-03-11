import { AppError } from "../../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../../helpers/errors/messages";
import { logger } from "../../../helpers/logger";
import { PaginationHelper } from "../../../helpers/pagination/functions";
import { FindByUserIdDto } from "../../dtos/pagination-dto";
import { ResponseDto } from "../../dtos/response-dto";
import { AccountRepository } from "../../repositories/account-repository";
import { UserRepository } from "../../repositories/user-repository";

export class GetUserAccountsUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accountRepository: AccountRepository
  ) {}

  async execute({ pagination, userId }: FindByUserIdDto): Promise<ResponseDto> {
    if (!userId) {
      logger.info(`[GetUserAccountsUsecase]: Missing required parameters`);
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      logger.info(`[GetUserAccountsUsecase]: User ${userId} not found`);
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    const { start, end } = PaginationHelper.getSliceParams({
      page: pagination.page,
      items: pagination.items,
    });

    logger.info(
      `[GetUserAccountsUsecase]: Getting accounts from user ${userId}`
    );

    const accounts = await this.accountRepository.findByUserId(userId);

    logger.info(
      `[GetUserAccountsUsecase]: Successfully got accounts from user ${userId}`
    );

    const result = accounts.slice(start, end);

    const totalBalance = accounts
      .reduce((acc, account) => acc + account.balance, 0)
      .toFixed(2);

    const accountsMetrics = accounts.map((account) => ({
      name: account.name,
      balance: account.balance,
    }));

    const metadata = PaginationHelper.getMetadata({
      data: accounts,
      page: pagination.page,
      items: pagination.items,
    });

    return {
      metadata,
      data: {
        accounts: result,
        totalBalance: Number(totalBalance),
        metricsData: accountsMetrics,
      },
    };
  }
}
