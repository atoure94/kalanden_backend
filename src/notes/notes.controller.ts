// src/notes/notes.controller.ts
import {
  Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto, UpdateNoteDto } from './notes.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly svc: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Create note' })
  create(@Body() dto: CreateNoteDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateNoteDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
