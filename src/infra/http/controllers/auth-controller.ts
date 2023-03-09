import { Request, Response } from "express";

import { AuthService } from "../../../application/services/auth-service";
import {
  handleHttpErrorResponse,
  handleHttpResponse,
} from "../utils/response-handler";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    try {
      const result = await this.authService.register({
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
      const result = await this.authService.login({ email, password });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }
}
