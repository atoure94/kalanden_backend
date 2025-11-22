// src/teachers/teachers.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto, UpdateTeacherDto } from './teachers.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('teachers')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly svc: TeachersService) {}

  @Post()
  create(@Body() dto: CreateTeacherDto) {
    return this.svc.create(dto);
  }

  @Get()
  findAll(@Query('relations') relations?: string) {
    const rel = relations ? relations.split(',') : undefined;
    return this.svc.findAll(rel);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTeacherDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
