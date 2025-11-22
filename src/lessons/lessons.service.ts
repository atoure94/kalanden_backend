// src/lessons/lessons.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lessons } from './lessons.entity';
import { Repository } from 'typeorm';
import { CreateLessonDto, UpdateLessonDto } from './lessons.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lessons) private lessonsRepo: Repository<Lessons>,
  ) {}

  create(dto: CreateLessonDto): Promise<Lessons> {
    const l = this.lessonsRepo.create(dto);
    return this.lessonsRepo.save(l);
  }

  findAll(relations: string[] = ['teacher']): Promise<Lessons[]> {
    return this.lessonsRepo.find({ relations });
  }

  async findOne(id: number, relations: string[] = ['teacher']): Promise<Lessons> {
    const l = await this.lessonsRepo.findOne({ where: { id }, relations });
    if (!l) throw new NotFoundException(`Lesson ${id} not found`);
    return l;
  }

  async update(id: number, dto: UpdateLessonDto): Promise<Lessons> {
    const l = await this.findOne(id);
    Object.assign(l, dto);
    return this.lessonsRepo.save(l);
  }

  async remove(id: number): Promise<void> {
    const r = await this.lessonsRepo.delete({ id });
    if (r.affected === 0) throw new NotFoundException(`Lesson ${id} not found`);
  }
}
