import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Students } from "../students/students.entity";

@Entity()
export class Classe {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  level: string;

  @ApiProperty()
  @Column()
  year: string;

  @ApiProperty({ type: () => [Students] })
  @OneToMany(() => Students, (student) => student.classe)
  students: Students[];
}
