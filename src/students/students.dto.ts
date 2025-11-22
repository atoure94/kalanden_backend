// students.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  classeId: number;

  @ApiProperty()
  @IsDateString()
  enter_date: Date;

  @ApiProperty()
  @IsDateString()
  exit_date: Date;
}

export class UpdateStudentDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  userId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  classeId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  enter_date?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  exit_date?: Date;
}

export class StudentResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  classeId: number;

  @ApiProperty()
  enter_date: Date;

  @ApiProperty()
  exit_date: Date;
}
