import { logger } from "../utils/logger";
import { AppError } from "../utils/app-error";
import { type IExpenseRepository, type IUserRepository } from "../repositories";
import { type ExpenseProps } from "../interfaces/expense";

interface FindUserExpensesProps {
  userId: string;
}

interface CreateExpenseProps {
  userId: string;
  title: string;
  imageUrl?: string;
}

interface UpdateExpenseProps {
  expenseId: string;
  title?: string;
  imageUrl?: string;
  isPaid?: boolean;
  isActive?: boolean;
}

interface DeleteExpenseProps {
  expenseId: string;
}

interface UpdateAllExpensesResponseProps {
  message: string;
}

export class ExpenseService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly expenseRepository: IExpenseRepository
  ) {}

  async findByUser({ userId }: FindUserExpensesProps): Promise<ExpenseProps[]> {
    logger.info(`Find user ${userId} expenses`);

    if (!userId) {
      throw new AppError("User id not provided");
    }

    const userExists = await this.userRepository.findById(userId);
    if (!userExists) {
      throw new AppError("User does not exists");
    }

    const result = await this.expenseRepository.findByUserId(userId);
    return result;
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
