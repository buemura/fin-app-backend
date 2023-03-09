import { Request, Response } from "express";

import { UserService } from "../../../application/services/user-service";
import {
  handleHttpErrorResponse,
  handleHttpResponse,
} from "../utils/response-handler";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async findById(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    try {
      const result = await this.userService.findById(userId);
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }
}
