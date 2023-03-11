import { logger } from "../../../helpers/logger";
import { ResponseDto } from "../../dtos/response-dto";
import { ExpenseRepository } from "../../repositories/expense-repository";

export class ResetExpensesPaymentStatusUsecase {
  constructor(private readonly expenseRepository: ExpenseRepository) {}

  async execute(): Promise<ResponseDto> {
    logger.info(
      `[ResetExpensesPaymentStatusUsecase]: Reseting all expenses payment status`
    );
    await this.expenseRepository.updateAll();

    logger.info(
      `[ResetExpensesPaymentStatusUsecase]: Successfully reseted all expenses payment status`
    );
    return {
      data: {
        message: "successfully reset payment status",
      },
    };
  }
}
