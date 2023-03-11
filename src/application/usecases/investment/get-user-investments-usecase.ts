import { AppError } from "../../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../../helpers/errors/messages";
import { logger } from "../../../helpers/logger";
import { PaginationHelper } from "../../../helpers/pagination/functions";
import { FindByUserIdDto } from "../../dtos/pagination-dto";
import { ResponseDto } from "../../dtos/response-dto";
import { InvestmentRepository } from "../../repositories/investment-repository";
import { UserRepository } from "../../repositories/user-repository";

export class GetUserInvestmentsUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly investmentRepository: InvestmentRepository
  ) {}

  async execute({ userId, pagination }: FindByUserIdDto): Promise<ResponseDto> {
    if (!userId) {
      logger.info(`[GetUserInvestmentsUsecase]: Missing required parameters`);
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      logger.info(`[GetUserInvestmentsUsecase]: User ${userId} not found`);
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    const { start, end } = PaginationHelper.getSliceParams({
      page: pagination.page,
      items: pagination.items,
    });

    logger.info(
      `[GetUserInvestmentsUsecase]: Getting investment from user ${userId}`
    );
    const investments = await this.investmentRepository.findByUserId(userId);

    logger.info(
      `[GetUserInvestmentsUsecase]: Successfully got investment from user ${userId}`
    );

    const result = investments.slice(start, end);

    const metadata = PaginationHelper.getMetadata({
      data: investments,
      page: pagination.page,
      items: pagination.items,
    });

    return {
      metadata,
      data: result,
    };
  }
}
