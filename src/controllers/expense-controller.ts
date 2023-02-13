import { type Request, type Response } from "express";
import { type ExpenseService } from "../services/expense-service";
import {
  handleHttpResponse,
  handleHttpErrorResponse,
} from "../utils/response-handler";

export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  async findByUserId(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    try {
      const result = await this.expenseService.findByUser({ userId });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async createExpense(request: Request, response: Response): Promise<Response> {
    const { userId, title, imageUrl } = request.body;

    try {
      const result = await this.expenseService.createExpense({
        userId,
        title,
        imageUrl,
      });
      return handleHttpResponse(response, 201, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async updateExpense(request: Request, response: Response): Promise<Response> {
    const { expenseId } = request.params;
    const { title, isPaid, isActive } = request.body;

    try {
      const result = await this.expenseService.updateExpense({
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

  async updateAllExpense(
    _request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const result = await this.expenseService.updateAllExpenses();
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async deleteExpense(request: Request, response: Response): Promise<Response> {
    const { expenseId } = request.params;

    try {
      const result = await this.expenseService.deleteExpense({ expenseId });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }
}
