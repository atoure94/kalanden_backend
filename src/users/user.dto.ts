import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber, MinLength, IsEnum } from 'class-validator';
import { UserRole } from './user.entity';

export class CreateUserDto {
@IsNumber()
id: number;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 33612345678 })
  @IsNumber()
  phone: string;

  @ApiProperty({ example: 'strongpassword' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ enum: [UserRole.CLIENT, UserRole.COURSIER], default: UserRole.CLIENT })
  @IsOptional()
  @IsEnum([UserRole.CLIENT, UserRole.COURSIER])
  role?: UserRole;

  otpCode?: string;
  otpExpiresAt?: Date;
}

export class UpdateUserDto {

  @ApiPropertyOptional({ example: 'John' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ example: 33612345678 })
  @IsOptional()
  @IsNumber()
  phone?: string;

  @ApiPropertyOptional({ example: 'newpassword' })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

@ApiPropertyOptional({example: 'client' ,enum: [UserRole.CLIENT, UserRole.COURSIER], default: UserRole.CLIENT })
  @IsOptional()
  @IsEnum([UserRole.CLIENT, UserRole.COURSIER])
  role?: UserRole;

}

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: 33612345678 })
  phone: string;

  @ApiProperty({example: 'client', enum: UserRole })
  role: UserRole;
  

  @ApiProperty({ example: '2024-08-06T12:00:00.000Z' })
  createdAt: Date;
}