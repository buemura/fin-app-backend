import { AccessTokenProvider } from '@application/providers/access-token-provider';
import {
  ForbiddenException,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class AuthMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const accessToken = request.headers.authorization?.split(' ')[1];

    if (!accessToken) {
      throw new UnauthorizedException('Missing authorization token');
    }

    try {
      const decodedToken = AccessTokenProvider.verify(accessToken);
      request.user = decodedToken;

      console.log(request.user);

      next();
    } catch (err) {
      console.error(err);
      throw new ForbiddenException('Invalid authentication credentials.');
    }
  }
}
