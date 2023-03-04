import {
  CreateExpenseProps,
  DeleteExpenseProps,
  ExpenseProps,
  FindUserExpensesProps,
  FindUserExpensesResponse,
  UpdateAllExpensesResponseProps,
  UpdateExpenseProps,
} from "@interfaces/expense";
import { IExpenseRepository, IUserRepository } from "@repositories/index";
import { AppError } from "@utils/app-error";
import { paginationMetadata, sliceParams } from "@utils/functions";
import { logger } from "@utils/logger";

export class ExpenseService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly expenseRepository: IExpenseRepository
  ) {}

  async findByUser({
    pagination,
    userId,
  }: FindUserExpensesProps): Promise<FindUserExpensesResponse> {
    logger.info(`Find user ${userId} expenses`);

    if (!userId) {
      throw new AppError("User id not provided");
    }

    const userExists = await this.userRepository.findById(userId);
    if (!userExists) {
      throw new AppError("User does not exists");
    }

    const { start, end } = sliceParams({
      page: pagination.page,
      items: pagination.items,
    });

    const expenses = await this.expenseRepository.findByUserId(userId);
    const result = expenses.slice(start, end);

    const metadata = paginationMetadata({
      data: expenses,
      page: pagination.page,
      items: pagination.items,
    });

    return {
      metadata,
      data: result,
    };
  }

  async createExpense(data: CreateExpenseProps): Promise<ExpenseProps> {
    logger.info(`Create expenses`);

    const userExists = await this.userRepository.findById(data.userId);
    if (!userExists) {
      throw new AppError("User does not exists");
    }

    const result = await this.expenseRepository.create(data);
    return result;
  }

  async updateExpense(data: UpdateExpenseProps): Promise<ExpenseProps | null> {
    logger.info(`Update expenses`);

    const expenseExists = await this.expenseRepository.findById(data.expenseId);
    if (!expenseExists) {
      throw new AppError("Expense does not exists");
    }

    const result = await this.expenseRepository.update(data);
    return result;
  }

  async updateAllExpenses(): Promise<UpdateAllExpensesResponseProps> {
    logger.info(`Update all expenses`);

    await this.expenseRepository.updateAll();

    return {
      message: "updated all expense payment status",
    };
  }

  async deleteExpense(data: DeleteExpenseProps): Promise<ExpenseProps | null> {
    logger.info(`Delete expenses`);

    const expenseExists = await this.expenseRepository.findById(data.expenseId);
    if (!expenseExists) {
      throw new AppError("Expense does not exists");
    }

    const result = await this.expenseRepository.delete(data.expenseId);
    return result;
  }
}
