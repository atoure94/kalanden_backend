import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Users } from "../users/user.entity";
import { Lessons } from "../lessons/lessons.entity";
import { Notes } from "../notes/notes.entity";

@Entity()
export class Teachers {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => Users, (user) => user.teachers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: Users;

  @ApiProperty()
  @Column()
  userId: number;

  @ApiProperty({ type: () => [Lessons] })
  @OneToMany(() => Lessons, (lesson) => lesson.teacher)
  lessons: Lessons[];

  @ApiProperty({ type: () => [Notes] })
  @OneToMany(() => Notes, (note) => note.teacher)
  notes: Notes[];
}
