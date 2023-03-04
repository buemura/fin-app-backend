import { Request, Response } from "express";

import { InvestmentService } from "@services/investment-service";
import { DEFAULT_PAGINATION } from "@utils/constants";
import {
  handleHttpErrorResponse,
  handleHttpResponse,
} from "@utils/response-handler";

export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  async findByUserId(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const pagination = {
      page: Number(request.query.page) || DEFAULT_PAGINATION.PAGE,
      items: Number(request.query.items) || DEFAULT_PAGINATION.ITEMS,
    };

    try {
      const result = await this.investmentService.findByUserId({
        userId,
        pagination,
      });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async createInvestment(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { userId } = request.params;
    const { accountId, category, ticker, type } = request.body;

    try {
      const result = await this.investmentService.createInvestment({
        userId,
        accountId,
        category,
        ticker,
        type,
      });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async updateInvestment(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;
    const { accountId, category, ticker, type } = request.body;

    try {
      const result = await this.investmentService.updateInvestment({
        id,
        accountId,
        category,
        ticker,
        type,
      });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async deleteInvestment(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    try {
      const result = await this.investmentService.deleteInvestment({
        id,
      });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }
}
