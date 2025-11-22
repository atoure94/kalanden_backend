// src/auth/auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  LoginDto,
  SignupDto,
  VerifyOtpDto,
  ResendOtpDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './auth.dto';
import { CreateUserDto } from '../users/user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Authenticated user with JWT' })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Start signup (sends OTP to e-mail)' })
  @ApiBody({ type: SignupDto })
  @ApiResponse({ status: 201, description: 'Signup started — OTP sent' })
  async signup(@Body() body: SignupDto) {
    // Adapt body to CreateUserDto shape if needed
    const createDto: CreateUserDto = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      password: body.password,
      role: undefined, // let AuthService set default or accept later
    } as any;
    return this.authService.signup(createDto);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify signup OTP and create account' })
  @ApiBody({ type: VerifyOtpDto })
  @ApiResponse({ status: 200, description: 'Account created and JWT returned' })
  async verifyOtp(@Body() body: VerifyOtpDto) {
    return this.authService.verifyOtp(body.email, body.otp);
  }

  @Post('resend-otp')
  @ApiOperation({ summary: 'Resend signup OTP' })
  @ApiBody({ type: ResendOtpDto })
  @ApiResponse({ status: 200 })
  async resendOtp(@Body() body: ResendOtpDto) {
    return this.authService.resendOtp(body.email);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password reset (sends OTP to e-mail)' })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({ status: 200 })
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body.email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password using OTP' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ status: 200 })
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body.email, body.otp, body.newPassword);
  }
}
