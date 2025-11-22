import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Students } from "../students/students.entity";

@Entity()
export class Absences {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => Students, (student) => student.absences, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studentId' })
  student: Students;

  @ApiProperty()
  @Column()
  studentId: number;

  @ApiProperty()
  @Column()
  date: Date;

  @ApiProperty()
  @Column()
  reason: string;
}
