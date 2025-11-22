// src/absences/absences.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Absences } from './absences.entity';
import { AbsencesService } from './absences.service';
import { AbsencesController } from './absences.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Absences])],
  providers: [AbsencesService],
  controllers: [AbsencesController],
  exports: [AbsencesService],
})
export class AbsencesModule {}
