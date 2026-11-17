import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { usuario: string; contrasena: string }) {
    return this.authService.register(body.usuario, body.contrasena);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: { usuario: string; contrasena: string }) {
    const user = await this.authService.validateUser(body.usuario, body.contrasena);
    return this.authService.login(user);
  }
}