import { type Request, type Response } from "express";

import { type UserService } from "../services/user-service";
import { handleHttpResponse } from "../helpers/handle-http-response";
import { handleHttpErrorResponse } from "../helpers/handle-http-error-response";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getUserDetails(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { userId } = request.params;

    try {
      const result = await this.userService.getUserDetails({ userId });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async signUp(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    try {
      const result = await this.userService.signUpUser({
        name,
        email,
        password,
      });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }

  async signIn(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const result = await this.userService.signInUser({ email, password });
      return handleHttpResponse(response, 200, result);
    } catch (error: any) {
      return handleHttpErrorResponse(response, error);
    }
  }
}
