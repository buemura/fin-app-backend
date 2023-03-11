import { Request, Response } from "express";

import {
  CreateExpenseUsecase,
  DeleteExpenseUsecase,
  GetUserExpensesUsecase,
  ResetExpensesPaymentStatusUsecase,
  UpdateExpenseUsecase,
} from "../../../application/usecases";
import { DEFAULT_PAGINATION } from "../../../helpers/pagination/constants";
import {
  handleHttpErrorResponse,
  handleHttpResponse,
} from "../utils/response-handler";

export class ExpenseController {
  constructor(
    private readonly getUserExpensesUsecase: GetUserExpensesUsecase,
    private readonly createExpenseUsecase: CreateExpenseUsecase,
    private readonly updateExpenseUsecase: UpdateExpenseUsecase,
    private readonly resetExpensesPaymentStatusUsecase: ResetExpensesPaymentStatusUsecase,
    private readonly deleteExpenseUsecase: DeleteExpenseUsecase
  ) {}

  async findByUserId(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const pagination = {
      page: Number(request.query.page) || DEFAULT_PAGINATION.PAGE,
      items: Number(request.query.items) || DEFAULT_PAGINATION.ITEMS,
    };

    try {
      const result = await this.getUserExpensesUsecase.execute({
        pagination,
        userId,
      });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const { title, imageUrl } = request.body;

    try {
      const result = await this.createExpenseUsecase.execute({
        userId,
        title,
        imageUrl,
      });
      return handleHttpResponse(response, 201, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { expenseId } = request.params;
    const { title, isPaid, isActive } = request.body;

    try {
      const result = await this.updateExpenseUsecase.execute({
        expenseId,
        title,
        isPaid,
        isActive,
      });

      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async resetPaymentStatus(
    _request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const result = await this.resetExpensesPaymentStatusUsecase.execute();
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { expenseId } = request.params;

    try {
      const result = await this.deleteExpenseUsecase.execute(expenseId);
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }
}
