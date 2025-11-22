import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../users/user.entity';
import { Classe } from '../classe/classe.entity';
import { Notes } from '../notes/notes.entity';
import { Absences } from '../absences/absences.entity';

@Entity()
export class Students {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => Users, (user) => user.students, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: Users;

  @ApiProperty()
  @Column()
  userId: number;

  @ApiProperty()
  @ManyToOne(() => Classe, (classe) => classe.students, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'classeId' })
  classe: Classe;

  @ApiProperty()
  @Column()
  classeId: number;

  @ApiProperty({ type: () => [Notes] })
  @OneToMany(() => Notes, (note) => note.student)
  notes: Notes[];

  @ApiProperty({ type: () => [Absences] })
  @OneToMany(() => Absences, (absence) => absence.student)
  absences: Absences[];

  @ApiProperty()
  @Column()
  enter_date: Date;

  @ApiProperty()
  @Column()
  exit_date: Date;
}
