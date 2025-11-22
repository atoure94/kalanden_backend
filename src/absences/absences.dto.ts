// absences.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateAbsenceDto {
  @ApiProperty()
  @IsNumber()
  studentId: number;

  @ApiProperty()
  @IsDateString()
  date: Date;

  @ApiProperty()
  @IsString()
  reason: string;
}

export class UpdateAbsenceDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  studentId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  date?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class AbsenceResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  studentId: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  reason: string;
}
