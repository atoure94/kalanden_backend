// src/classe/classe.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classe } from './classe.entity';
import { Repository } from 'typeorm';
import { CreateClasseDto, UpdateClasseDto } from './classe.dto';

@Injectable()
export class ClasseService {
  constructor(
    @InjectRepository(Classe) private repo: Repository<Classe>,
  ) {}

  create(dto: CreateClasseDto): Promise<Classe> {
    const c = this.repo.create(dto);
    return this.repo.save(c);
  }

  findAll(relations: string[] = ['students']): Promise<Classe[]> {
    return this.repo.find({ relations });
  }

  async findOne(id: number, relations: string[] = ['students']): Promise<Classe> {
    const c = await this.repo.findOne({ where: { id }, relations });
    if (!c) throw new NotFoundException(`Classe ${id} not found`);
    return c;
  }

  async update(id: number, dto: UpdateClasseDto): Promise<Classe> {
    const c = await this.findOne(id);
    Object.assign(c, dto);
    return this.repo.save(c);
  }

  async remove(id: number): Promise<void> {
    const r = await this.repo.delete({ id });
    if (r.affected === 0) throw new NotFoundException(`Classe ${id} not found`);
  }
}
