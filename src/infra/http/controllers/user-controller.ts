import { Request, Response } from "express";

import { GetUserDetailsUsecase } from "../../../application/usecases";
import {
  handleHttpErrorResponse,
  handleHttpResponse,
} from "../utils/response-handler";

export class UserController {
  constructor(private readonly getUserDetailsUsecase: GetUserDetailsUsecase) {}

  async findById(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    try {
      const result = await this.getUserDetailsUsecase.execute(userId);
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }
}
