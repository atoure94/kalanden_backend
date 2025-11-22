import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Students } from '../students/students.entity';
import { Teachers } from '../teachers/teachers.entity';

@Entity()
export class Notes {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => Students, (student) => student.notes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studentId' })
  student: Students;

  @ApiProperty()
  @Column()
  studentId: number;

  @ApiProperty()
  @ManyToOne(() => Teachers, (teacher) => teacher.notes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'teacherId' })
  teacher: Teachers;

  @ApiProperty()
  @Column()
  teacherId: number;

  @ApiProperty()
  @Column()
  value: number;

  @ApiProperty()
  @Column()
  type: string;

  @ApiProperty()
  @Column()
  date: Date;
}
