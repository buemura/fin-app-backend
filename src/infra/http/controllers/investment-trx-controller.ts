import { Request, Response } from "express";

import { InvestmentTrxService } from "@application/services/investment-trx-service";
import { DEFAULT_PAGINATION } from "@helpers/pagination/constants";
import {
  handleHttpErrorResponse,
  handleHttpResponse,
} from "../utils/response-handler";

export class InvestmentTrxController {
  constructor(private readonly investmentTrxService: InvestmentTrxService) {}

  async findByUserId(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const pagination = {
      page: Number(request.query.page) || DEFAULT_PAGINATION.PAGE,
      items: Number(request.query.items) || DEFAULT_PAGINATION.ITEMS,
    };

    try {
      const result = await this.investmentTrxService.findByUserId({
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
    const { investmentId, pricePerQuantity, pricePaid, quantity } =
      request.body;

    try {
      const result = await this.investmentTrxService.create({
        userId,
        investmentId,
        pricePerQuantity,
        pricePaid,
        quantity,
      });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { investmentTrxId } = request.params;
    const { investmentId, pricePerQuantity, quantity } = request.body;

    try {
      const result = await this.investmentTrxService.update({
        investmentTrxId,
        investmentId,
        pricePerQuantity,
        quantity,
      });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { investmentTrxId } = request.params;

    try {
      const result = await this.investmentTrxService.delete(investmentTrxId);
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }
}
