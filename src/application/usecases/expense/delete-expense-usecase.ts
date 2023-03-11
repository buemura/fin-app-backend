import { AppError } from "../../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../../helpers/errors/messages";
import { logger } from "../../../helpers/logger";
import { ResponseDto } from "../../dtos/response-dto";
import { ExpenseRepository } from "../../repositories/expense-repository";

export class DeleteExpenseUsecase {
  constructor(private readonly expenseRepository: ExpenseRepository) {}

  async execute(expenseId: string): Promise<ResponseDto> {
    const expenseExists = await this.expenseRepository.findById(expenseId);
    if (!expenseExists) {
      logger.info(`[DeleteExpenseUsecase]: Expense ${expenseId} not found`);
      throw new AppError(ERROR_MESSAGE.EXPENSE_NOT_FOUND);
    }

    logger.info(`[DeleteExpenseUsecase]: Deleting expense ${expenseId}`);
    const result = await this.expenseRepository.delete(expenseId);

    logger.info(
      `[DeleteExpenseUsecase]: Successfully deleted expense ${expenseId}`
    );
    return {
      data: {
        id: result?.id,
      },
    };
  }
}
