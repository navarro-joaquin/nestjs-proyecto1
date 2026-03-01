import { Module } from '@nestjs/common';
import { RazasService } from './razas.service';
import { RazasController } from './razas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Raza } from './entities/raza.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Raza])],
  controllers: [RazasController],
  providers: [RazasService],
  exports: [TypeOrmModule, RazasService],
})
export class RazasModule {}
