import { AppError } from "../../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../../helpers/errors/messages";
import { logger } from "../../../helpers/logger";
import { PaginationHelper } from "../../../helpers/pagination/functions";
import { FindByUserIdDto } from "../../dtos/pagination-dto";
import { ResponseDto } from "../../dtos/response-dto";
import { InvestmentTrxRepository } from "../../repositories/investment-trx-repository";
import { UserRepository } from "../../repositories/user-repository";

// TODO: Write tests for this usecase
export class GetUserInvestmentTrxsUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly investmentTrxRepository: InvestmentTrxRepository
  ) {}

  async execute({ userId, pagination }: FindByUserIdDto): Promise<ResponseDto> {
    if (!userId) {
      logger.info(
        `[GetUserInvestmentTrxsUsecase]: Missing required parameters`
      );
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      logger.info(`[GetUserInvestmentTrxsUsecase]: User ${userId} not found`);
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    const { start, end } = PaginationHelper.getSliceParams({
      page: pagination.page,
      items: pagination.items,
    });

    logger.info(
      `[GetUserInvestmentTrxsUsecase]: Getting investment trxs from user ${userId}`
    );
    const investmentsTrx = await this.investmentTrxRepository.findByUserId(
      userId
    );
    const result = investmentsTrx.slice(start, end);

    logger.info(
      `[GetUserInvestmentTrxsUsecase]: Successfully got investment trxs from user ${userId}`
    );

    const metadata = PaginationHelper.getMetadata({
      data: investmentsTrx,
      page: pagination.page,
      items: pagination.items,
    });

    return {
      metadata,
      data: result,
    };
  }
}
