import { AppError } from "../../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../../helpers/errors/messages";
import { logger } from "../../../helpers/logger";
import { PaginationHelper } from "../../../helpers/pagination/functions";
import { FindByUserIdDto } from "../../dtos/pagination-dto";
import { ResponseDto } from "../../dtos/response-dto";
import { ExpenseRepository } from "../../repositories/expense-repository";
import { UserRepository } from "../../repositories/user-repository";

export class GetUserExpensesUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly expenseRepository: ExpenseRepository
  ) {}

  async execute({ pagination, userId }: FindByUserIdDto): Promise<ResponseDto> {
    if (!userId) {
      logger.info(`[GetUserExpensesUsecase]: Missing required parameter`);
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const userExists = await this.userRepository.findById(userId);
    if (!userExists) {
      logger.info(`[GetUserExpensesUsecase]: User ${userId} not found`);
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    const { start, end } = PaginationHelper.getSliceParams({
      page: pagination.page,
      items: pagination.items,
    });

    logger.info(
      `[GetUserExpensesUsecase]: Getting expenses from user ${userId}`
    );

    const expenses = await this.expenseRepository.findByUserId(userId);
    const result = expenses.slice(start, end);

    const metadata = PaginationHelper.getMetadata({
      data: expenses,
      page: pagination.page,
      items: pagination.items,
    });

    logger.info(
      `[GetUserExpensesUsecase]: Successfully got expenses from user ${userId}`
    );

    return {
      metadata,
      data: result,
    };
  }
}
