import { AppError } from "../../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../../helpers/errors/messages";
import { logger } from "../../../helpers/logger";
import { CreateExpenseDto } from "../../dtos/expense-dto";
import { ResponseDto } from "../../dtos/response-dto";
import { ExpenseRepository } from "../../repositories/expense-repository";
import { UserRepository } from "../../repositories/user-repository";

export class CreateExpenseUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly expenseRepository: ExpenseRepository
  ) {}

  async execute(data: CreateExpenseDto): Promise<ResponseDto> {
    if (!data.userId || !data.title) {
      logger.info(`[CreateExpenseUsecase]: Missing required parameters`);
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const userExists = await this.userRepository.findById(data.userId);
    if (!userExists) {
      logger.info(`[CreateExpenseUsecase]: Related user not found`);
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    logger.info(`[CreateExpenseUsecase]: Creating expense`);
    const result = await this.expenseRepository.create(data);

    logger.info(`[CreateExpenseUsecase]: Successfully created expense`);
    return {
      data: {
        id: result?.id,
      },
    };
  }
}
