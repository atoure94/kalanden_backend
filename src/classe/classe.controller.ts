// src/classe/classe.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ClasseService } from './classe.service';
import { CreateClasseDto, UpdateClasseDto } from './classe.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('classe')
@Controller('classe')
export class ClasseController {
  constructor(private readonly svc: ClasseService) {}

  @Post()
  create(@Body() dto: CreateClasseDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateClasseDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
