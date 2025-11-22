// src/absences/absences.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Absences } from './absences.entity';
import { Repository } from 'typeorm';
import { CreateAbsenceDto, UpdateAbsenceDto } from './absences.dto';

@Injectable()
export class AbsencesService {
  constructor(
    @InjectRepository(Absences) private repo: Repository<Absences>,
  ) {}

  create(dto: CreateAbsenceDto): Promise<Absences> {
    const a = this.repo.create(dto);
    return this.repo.save(a);
  }

  findAll(relations: string[] = ['student']): Promise<Absences[]> {
    return this.repo.find({ relations });
  }

  async findOne(id: number, relations: string[] = ['student']): Promise<Absences> {
    const a = await this.repo.findOne({ where: { id }, relations });
    if (!a) throw new NotFoundException(`Absence ${id} not found`);
    return a;
  }

  async update(id: number, dto: UpdateAbsenceDto): Promise<Absences> {
    const a = await this.findOne(id);
    Object.assign(a, dto);
    return this.repo.save(a);
  }

  async remove(id: number): Promise<void> {
    const r = await this.repo.delete({ id });
    if (r.affected === 0) throw new NotFoundException(`Absence ${id} not found`);
  }
}
