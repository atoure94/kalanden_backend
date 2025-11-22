// src/teachers/teachers.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teachers } from './teachers.entity';
import { Repository } from 'typeorm';
import { CreateTeacherDto, UpdateTeacherDto } from './teachers.dto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teachers) private repo: Repository<Teachers>,
  ) {}

  create(dto: CreateTeacherDto): Promise<Teachers> {
    const t = this.repo.create(dto);
    return this.repo.save(t);
  }

  findAll(relations: string[] = ['user', 'lessons', 'notes']): Promise<Teachers[]> {
    return this.repo.find({ relations });
  }

  async findOne(id: number, relations: string[] = ['user', 'lessons', 'notes']): Promise<Teachers> {
    const t = await this.repo.findOne({ where: { id }, relations });
    if (!t) throw new NotFoundException(`Teacher ${id} not found`);
    return t;
  }

  async update(id: number, dto: UpdateTeacherDto): Promise<Teachers> {
    const t = await this.findOne(id);
    Object.assign(t, dto);
    return this.repo.save(t);
  }

  async remove(id: number): Promise<void> {
    const r = await this.repo.delete({ id });
    if (r.affected === 0) throw new NotFoundException(`Teacher ${id} not found`);
  }
}
