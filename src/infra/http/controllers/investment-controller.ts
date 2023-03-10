import { Request, Response } from "express";

import { InvestmentService } from "../../../application/services/investment-service";
import { DEFAULT_PAGINATION } from "../../../helpers/pagination/constants";
import {
  handleHttpErrorResponse,
  handleHttpResponse,
} from "../utils/response-handler";

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

  async create(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const { accountId, category, ticker, type } = request.body;

    try {
      const result = await this.investmentService.create({
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

  async update(request: Request, response: Response): Promise<Response> {
    const { investmentId } = request.params;
    const { accountId, category, ticker, type } = request.body;

    try {
      const result = await this.investmentService.update({
        investmentId,
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

  async updateInvestmentsCurrentPrices(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { userId } = request.params;

    try {
      const result =
        await this.investmentService.updateInvestmentsCurrentPrices(userId);
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { investmentId } = request.params;

    try {
      const result = await this.investmentService.delete(investmentId);
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }
}
