import { Request, Response } from "express";

import {
  CreateInvestmentTrxUsecase,
  DeleteInvestmentTrxUsecase,
  GetUserInvestmentTrxsUsecase,
  UpdateInvestmentTrxUsecase,
} from "../../../application/usecases";
import { DEFAULT_PAGINATION } from "../../../helpers/pagination/constants";
import {
  handleHttpErrorResponse,
  handleHttpResponse,
} from "../utils/response-handler";

export class InvestmentTrxController {
  constructor(
    private readonly getUserInvestmentTrxsUsecase: GetUserInvestmentTrxsUsecase,
    private readonly createInvestmentTrxUsecase: CreateInvestmentTrxUsecase,
    private readonly updateInvestmentTrxUsecase: UpdateInvestmentTrxUsecase,
    private readonly deleteInvestmentTrxUsecase: DeleteInvestmentTrxUsecase
  ) {}

  async findByUserId(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;
    const pagination = {
      page: Number(request.query.page) || DEFAULT_PAGINATION.PAGE,
      items: Number(request.query.items) || DEFAULT_PAGINATION.ITEMS,
    };

    try {
      const result = await this.getUserInvestmentTrxsUsecase.execute({
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
      const result = await this.createInvestmentTrxUsecase.execute({
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
      const result = await this.updateInvestmentTrxUsecase.execute({
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
      const result = await this.deleteInvestmentTrxUsecase.execute(
        investmentTrxId
      );
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }
}
