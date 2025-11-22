import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Teachers } from "../teachers/teachers.entity";

@Entity()
export class Lessons {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  code: string;

  @ApiProperty()
  @ManyToOne(() => Teachers, (teacher) => teacher.lessons, { onDelete: 'CASCADE' })
  teacher: Teachers;

  @ApiProperty()
  @Column()
  teacherId: number;
}
