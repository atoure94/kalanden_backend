import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto, UserResponseDto } from '../users/user.dto';
import { LoginDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'User authenticated with JWT',
    schema: {
      example: {
        access_token: 'jwt.token.here',
        user: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          createdAt: '2024-08-06T12:00:00.000Z',
        },
      },
    },
  })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Signup with email and password (hashed)' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User created with JWT',
    schema: {
      example: {
        access_token: 'jwt.token.here',
        user: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          createdAt: '2024-08-06T12:00:00.000Z',
        },
      },
    },
  })
  async signup(@Body() body: CreateUserDto) {
    return this.authService.signup(body);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Vérifie le code OTP envoyé par e-mail' })
  @ApiBody({
    schema: { example: { email: 'john.doe@example.com', otp: '123456' } },
  })
  async verifyOtp(@Body() body: { email: string; otp: string }) {
    return this.authService.verifyOtp(body.email, body.otp);
  }

  @Post('resend-otp')
  @ApiOperation({ summary: 'Renvoyer un nouveau code OTP par e-mail' })
  @ApiBody({
    schema: { example: { email: 'john.doe@example.com' } },
  })
  async resendOtp(@Body() body: { email: string }) {
    return this.authService.resendOtp(body.email);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Demande de réinitialisation du mot de passe (envoi OTP par e-mail)' })
  @ApiBody({
    schema: { example: { email: 'john.doe@example.com' } },
  })
  async forgotPassword(@Body() body: { email: string }) {
    return this.authService.forgotPassword(body.email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Réinitialisation du mot de passe avec OTP (par e-mail)' })
  @ApiBody({
    schema: {
      example: {
        email: 'john.doe@example.com',
        otp: '123456',
        newPassword: 'newpass123',
      },
    },
  })
  async resetPassword(@Body() body: { email: string; otp: string; newPassword: string }) {
    return this.authService.resetPassword(body.email, body.otp, body.newPassword);
  }
}
