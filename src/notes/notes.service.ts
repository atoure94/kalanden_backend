// src/notes/notes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notes } from './notes.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto, UpdateNoteDto } from './notes.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Notes) private notesRepo: Repository<Notes>,
  ) {}

  async create(dto: CreateNoteDto): Promise<Notes> {
    const note = this.notesRepo.create(dto);
    return this.notesRepo.save(note);
  }

  async findAll(relations: string[] = ['student', 'teacher']): Promise<Notes[]> {
    return this.notesRepo.find({ relations });
  }

  async findOne(id: number, relations: string[] = ['student', 'teacher']): Promise<Notes> {
    const n = await this.notesRepo.findOne({ where: { id }, relations });
    if (!n) throw new NotFoundException(`Note ${id} not found`);
    return n;
  }

  async update(id: number, dto: UpdateNoteDto): Promise<Notes> {
    const note = await this.findOne(id);
    Object.assign(note, dto);
    return this.notesRepo.save(note);
  }

  async remove(id: number): Promise<void> {
    const r = await this.notesRepo.delete({ id });
    if (r.affected === 0) throw new NotFoundException(`Note ${id} not found`);
  }
}
