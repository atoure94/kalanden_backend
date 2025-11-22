// notes.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty()
  @IsNumber()
  studentId: number;

  @ApiProperty()
  @IsNumber()
  teacherId: number;

  @ApiProperty()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsDateString()
  date: Date;
}

export class UpdateNoteDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  studentId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  teacherId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  value?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  date?: Date;
}

export class NoteResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  studentId: number;

  @ApiProperty()
  teacherId: number;

  @ApiProperty()
  value: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  date: Date;
}
