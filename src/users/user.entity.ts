import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';


export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
  COURSIER = 'coursier',
}

@Entity()
export class Users {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John' })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @Column()
  lastName: string;

  @ApiProperty({ example: '3361234' })
  @Column({ unique: true })
  phone: string;

  @ApiProperty({ example: 'hashedpassword' })
  @Column()
  password: string;

  @ApiProperty({ example: 'client', enum: UserRole })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
  role: UserRole;


  @Column({ nullable: true })
otpCode?: string;

@Column({ nullable: true })
otpExpiresAt?: Date;

  @ApiProperty({ example: '2024-08-06T12:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;
}
