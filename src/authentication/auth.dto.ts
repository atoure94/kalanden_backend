// src/auth/auth.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateUserDto as BaseCreateUserDto } from '../users/user.dto';

export class LoginDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  password: string;
}

/** Reuse shape of user create but keep small wrapper for Swagger */
export class SignupDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '33612345678' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'strongPassword123' })
  @IsString()
  @MinLength(6)
  password: string;

  // optional role is allowed through CreateUserDto; if you want include it add decorator
}

export class VerifyOtpDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: '123456' })
  otp: string;
}

export class ResendOtpDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  otp: string;

  @ApiProperty({ example: 'newStrongPassword1' })
  @IsString()
  @MinLength(6)
  newPassword: string;
}
