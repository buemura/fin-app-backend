import { Request, Response } from "express";

import { InvestmentTrxService } from "@services/investment-trx-service";
import { DEFAULT_PAGINATION } from "@utils/constants";
import {
  handleHttpErrorResponse,
  handleHttpResponse,
} from "@utils/response-handler";

export class InvestmentTrxController {
  constructor(private readonly investmentTrxService: InvestmentTrxService) {}

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
      const result = await this.investmentTrxService.findTrxByUserId({
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
      const result = await this.investmentTrxService.createInvestmentTrx({
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
      const result = await this.investmentTrxService.updateInvestmentTrx({
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
      const result = await this.investmentTrxService.deleteInvestmentTrx({
        id: investmentTrxId,
      });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }
}
