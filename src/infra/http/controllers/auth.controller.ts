import { Body, Controller, Post } from '@nestjs/common';

import { LoginAuthDto, RegisterAuthDto } from '@core/dtos/auth.dto';
import { AuthService } from '@core/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('/login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
}
