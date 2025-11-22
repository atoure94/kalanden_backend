import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Students } from "../students/students.entity"
import { Teachers } from 'src/teachers/teachers.entity';

export enum UserRole {
  ADMIN = 'admin',
  PROFESSEURS = 'professeurs',
  ELEVE = 'eleve',
  PARENT = 'parent',
}

@Entity()
export class Users {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ unique: true })
  phone: string;

  @ApiProperty()
  @Column()
  password: string;

  @OneToMany(() => Students, (student) => student.user)
  students: Students[];

  @OneToMany(() => Teachers, (teacher) => teacher.user)
  teachers: Teachers[];

  @ApiProperty({ enum: UserRole })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.PARENT })
  role: UserRole;

  @Column({ nullable: true })
  otpCode?: string;

  @Column({ nullable: true })
  otpExpiresAt?: Date;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
