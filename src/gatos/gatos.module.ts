import { Module } from '@nestjs/common';
import { GatosService } from './gatos.service';
import { GatosController } from './gatos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gato } from './entities/gato.entity';
import { RazasModule } from 'src/razas/razas.module';
import { VacunasModule } from 'src/vacunas/vacunas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Gato]), RazasModule, VacunasModule],
  controllers: [GatosController],
  providers: [GatosService],
})
export class GatosModule {}
