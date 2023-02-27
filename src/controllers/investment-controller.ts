import { Request, Response } from "express";
import {
  handleHttpResponse,
  handleHttpErrorResponse,
} from "../utils/response-handler";
import { InvestmentService } from "../services/investment-service";
import { DEFAULT_PAGINATION } from "../utils/constants";

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

  async findTrxByUserId(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { userId } = request.params;
    const pagination = {
      page: Number(request.query.page) || DEFAULT_PAGINATION.PAGE,
      items: Number(request.query.items) || DEFAULT_PAGINATION.ITEMS,
    };

    try {
      const result = await this.investmentService.findTrxByUserId({
        userId,
        pagination,
      });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async createInvestmentTrx(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { userId } = request.params;
    const { investmentId, pricePerQuantity, quantity } = request.body;

    try {
      const result = await this.investmentService.createInvestmentTrx({
        userId,
        investmentId,
        pricePerQuantity,
        quantity,
      });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async updateInvestmentTrx(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { investmentTrxId } = request.params;
    const { investmentId, pricePerQuantity, quantity } = request.body;

    try {
      const result = await this.investmentService.updateInvestmentTrx({
        id: investmentTrxId,
        investmentId,
        pricePerQuantity,
        quantity,
      });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async deleteInvestmentTrx(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { investmentTrxId } = request.params;

    try {
      const result = await this.investmentService.deleteInvestmentTrx({
        id: investmentTrxId,
      });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }
}
