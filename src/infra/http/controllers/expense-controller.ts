import { Request, Response } from "express";

import { ExpenseService } from "../../../application/services/expense-service";
import { DEFAULT_PAGINATION } from "../../../helpers/pagination/constants";
import {
  handleHttpErrorResponse,
  handleHttpResponse,
} from "../utils/response-handler";

export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  async findByUserId(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const pagination = {
      page: Number(request.query.page) || DEFAULT_PAGINATION.PAGE,
      items: Number(request.query.items) || DEFAULT_PAGINATION.ITEMS,
    };

    try {
      const result = await this.expenseService.findByUserId({
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
      const result = await this.expenseService.create({
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
      const result = await this.expenseService.update({
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
      const result = await this.expenseService.resetPaymentStatus();
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { expenseId } = request.params;

    try {
      const result = await this.expenseService.delete(expenseId);
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }
}
