// src/lessons/lessons.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto, UpdateLessonDto } from './lessons.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly svc: LessonsService) {}

  @Post()
  create(@Body() dto: CreateLessonDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLessonDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
