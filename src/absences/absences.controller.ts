// src/absences/absences.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { AbsencesService } from './absences.service';
import { CreateAbsenceDto, UpdateAbsenceDto } from './absences.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('absences')
@Controller('absences')
export class AbsencesController {
  constructor(private readonly svc: AbsencesService) {}

  @Post()
  create(@Body() dto: CreateAbsenceDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAbsenceDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
