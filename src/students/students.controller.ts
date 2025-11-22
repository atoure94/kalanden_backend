// src/students/students.controller.ts
import {
  Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto, UpdateStudentDto, StudentResponseDto } from './students.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly svc: StudentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create student' })
  @ApiResponse({ status: 201, description: 'Student created.' })
  create(@Body() dto: CreateStudentDto): Promise<StudentResponseDto> {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  findAll(@Query('relations') relations?: string): Promise<StudentResponseDto[]> {
    const rel = relations ? relations.split(',') : undefined;
    return this.svc.findAll(rel);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get student by id' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<StudentResponseDto> {
    return this.svc.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update student' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStudentDto): Promise<StudentResponseDto> {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete student' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.svc.remove(id);
  }
}
