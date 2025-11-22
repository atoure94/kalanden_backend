// src/classe/classe.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classe } from './classe.entity';
import { ClasseService } from './classe.service';
import { ClasseController } from './classe.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Classe])],
  providers: [ClasseService],
  controllers: [ClasseController],
  exports: [ClasseService],
})
export class ClasseModule {}
