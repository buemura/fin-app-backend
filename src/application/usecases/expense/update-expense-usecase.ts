import { AppError } from "../../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../../helpers/errors/messages";
import { logger } from "../../../helpers/logger";
import { UpdateExpenseDto } from "../../dtos/expense-dto";
import { ResponseDto } from "../../dtos/response-dto";
import { ExpenseRepository } from "../../repositories/expense-repository";

export class UpdateExpenseUsecase {
  constructor(private readonly expenseRepository: ExpenseRepository) {}

  async execute(data: UpdateExpenseDto): Promise<ResponseDto> {
    if (!data.expenseId) {
      logger.info(`[UpdateExpenseUsecase]: Missing required parameters`);
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const expenseExists = await this.expenseRepository.findById(data.expenseId);
    if (!expenseExists) {
      logger.info(
        `[UpdateExpenseUsecase]: Expense ${data.expenseId} not found`
      );
      throw new AppError(ERROR_MESSAGE.EXPENSE_NOT_FOUND);
    }

    logger.info(`[UpdateExpenseUsecase]: Updating expense ${data.expenseId}`);
    const result = await this.expenseRepository.update(data);

    logger.info(
      `[UpdateExpenseUsecase]: Successfully updated expense ${data.expenseId}`
    );

    return {
      data: {
        id: result?.id,
      },
    };
  }
}
