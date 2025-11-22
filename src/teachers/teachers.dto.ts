// teachers.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty()
  @IsNumber()
  userId: number;
}

export class UpdateTeacherDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  userId?: number;
}

export class TeacherResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;
}
