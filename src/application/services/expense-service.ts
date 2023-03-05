import { AppError } from "@helpers/errors/app-error";
import { ERROR_MESSAGE } from "@helpers/errors/messages";
import { logger } from "@helpers/logger";
import { PaginationHelper } from "@helpers/pagination/functions";

import { CreateExpenseDto, UpdateExpenseDto } from "../dtos/expense-dto";
import { FindByUserIdDto } from "../dtos/pagination-dto";
import { ResponseDto } from "../dtos/response-dto";
import { ExpenseRepository } from "../repositories/expense-repository";
import { UserRepository } from "../repositories/user-repository";

export class ExpenseService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly expenseRepository: ExpenseRepository
  ) {}

  async findByUserId({
    pagination,
    userId,
  }: FindByUserIdDto): Promise<ResponseDto> {
    logger.info(`Find expenses by user: ${userId}`);

    if (!userId) {
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const userExists = await this.userRepository.findById(userId);
    if (!userExists) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    const { start, end } = PaginationHelper.getSliceParams({
      page: pagination.page,
      items: pagination.items,
    });

    const expenses = await this.expenseRepository.findByUserId(userId);
    const result = expenses.slice(start, end);

    const metadata = PaginationHelper.getMetadata({
      data: expenses,
      page: pagination.page,
      items: pagination.items,
    });

    return {
      metadata,
      data: result,
    };
  }

  async create(data: CreateExpenseDto): Promise<ResponseDto> {
    logger.info(`Create expense`);

    if (!data.userId || !data.title) {
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const userExists = await this.userRepository.findById(data.userId);
    if (!userExists) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    const result = await this.expenseRepository.create(data);

    return {
      data: {
        id: result?.id,
      },
    };
  }

  async update(data: UpdateExpenseDto): Promise<ResponseDto> {
    logger.info(`Update expense: ${data.expenseId}`);

    if (!data.expenseId) {
      throw new AppError(ERROR_MESSAGE.MISSING_REQUIRED_PARAMETERS);
    }

    const expenseExists = await this.expenseRepository.findById(data.expenseId);
    if (!expenseExists) {
      throw new AppError(ERROR_MESSAGE.EXPENSE_NOT_FOUND);
    }

    const result = await this.expenseRepository.update(data);

    return {
      data: {
        id: result?.id,
      },
    };
  }

  async resetPaymentStatus(): Promise<ResponseDto> {
    logger.info(`Reset all expenses payment status`);
    await this.expenseRepository.updateAll();
    return {
      data: {
        message: "successfully reset payment status",
      },
    };
  }

  async delete(expenseId: string): Promise<ResponseDto> {
    logger.info(`Delete expense: ${expenseId}`);

    const expenseExists = await this.expenseRepository.findById(expenseId);
    if (!expenseExists) {
      throw new AppError(ERROR_MESSAGE.EXPENSE_NOT_FOUND);
    }

    const result = await this.expenseRepository.delete(expenseId);
    return {
      data: {
        id: result?.id,
      },
    };
  }
}
