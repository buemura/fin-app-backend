import { Request, Response } from "express";

import {
  LoginUserUsecase,
  RegisterUserUsecase,
} from "../../../application/usecases";
import {
  handleHttpErrorResponse,
  handleHttpResponse,
} from "../utils/response-handler";

export class AuthController {
  constructor(
    private readonly registerUserUsecase: RegisterUserUsecase,
    private readonly loginUserUsecase: LoginUserUsecase
  ) {}

  async register(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    try {
      const result = await this.registerUserUsecase.execute({
        name,
        email,
        password,
      });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const result = await this.loginUserUsecase.execute({ email, password });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }
}
