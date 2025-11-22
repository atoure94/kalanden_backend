// src/students/students.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Students } from './students.entity';
import { CreateStudentDto, UpdateStudentDto } from './students.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Students)
    private studentsRepo: Repository<Students>,
  ) {}

  async create(dto: CreateStudentDto): Promise<Students> {
    const student = this.studentsRepo.create(dto);
    return this.studentsRepo.save(student);
  }

  async findAll(relations: string[] = ['user', 'classe', 'notes', 'absences']): Promise<Students[]> {
    return this.studentsRepo.find({ relations });
  }

  async findOne(id: number, relations: string[] = ['user', 'classe', 'notes', 'absences']): Promise<Students> {
    const student = await this.studentsRepo.findOne({ where: { id }, relations });
    if (!student) throw new NotFoundException(`Student ${id} not found`);
    return student;
  }

  async update(id: number, dto: UpdateStudentDto): Promise<Students> {
    const student = await this.findOne(id);
    Object.assign(student, dto);
    return this.studentsRepo.save(student);
  }

  async remove(id: number): Promise<void> {
    const r = await this.studentsRepo.delete({ id });
    if (r.affected === 0) throw new NotFoundException(`Student ${id} not found`);
  }
}
