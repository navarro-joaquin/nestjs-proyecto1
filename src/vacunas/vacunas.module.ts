import { Module } from '@nestjs/common';
import { VacunasService } from './vacunas.service';
import { VacunasController } from './vacunas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacuna } from './entities/vacuna.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vacuna])],
  controllers: [VacunasController],
  providers: [VacunasService],
  exports: [TypeOrmModule, VacunasService],
})
export class VacunasModule { }
