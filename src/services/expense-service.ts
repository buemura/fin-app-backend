import { logger } from "../utils/logger";
import { AppError } from "../utils/app-error";
import { IRedisService } from "./redis-service";
import { IExpenseRepository, IUserRepository } from "../repositories";
import { paginationMetadata, sliceParams } from "../utils/functions";
import {
  FindUserExpensesProps,
  FindUserExpensesResponse,
  CreateExpenseProps,
  DeleteExpenseProps,
  ExpenseProps,
  UpdateAllExpensesResponseProps,
  UpdateExpenseProps,
} from "../interfaces/expense";

export class ExpenseService {
  private readonly expenseKey: string = process.env.REDIS_EXPENSES_KEY ?? "";

  constructor(
    private readonly userRepository: IUserRepository,
    private readonly expenseRepository: IExpenseRepository,
    private readonly redisService: IRedisService
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

    let expenses = await this.redisService.get<ExpenseProps[]>(this.expenseKey);
    if (!expenses) {
      logger.info(`No cache found`);
      expenses = await this.expenseRepository.findByUserId(userId);
      logger.info(`Creating cache for expenses`);
      await this.redisService.save(this.expenseKey, expenses);
    } else {
      expenses = expenses
        .filter((expense) => expense.userId === userId)
        .slice(start, end);
    }

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

    await this.redisService.remove(this.expenseKey);

    return result;
  }

  async updateExpense(data: UpdateExpenseProps): Promise<ExpenseProps | null> {
    logger.info(`Update expenses`);

    const expenseExists = await this.expenseRepository.findById(data.expenseId);
    if (!expenseExists) {
      throw new AppError("Expense does not exists");
    }

    const result = await this.expenseRepository.update(data);

    await this.redisService.remove(this.expenseKey);

    return result;
  }

  async updateAllExpenses(): Promise<UpdateAllExpensesResponseProps> {
    logger.info(`Update all expenses`);

    await this.expenseRepository.updateAll();

    await this.redisService.remove(this.expenseKey);

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

    await this.redisService.remove(this.expenseKey);

    return result;
  }
}
