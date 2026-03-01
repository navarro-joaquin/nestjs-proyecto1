import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGatoDto } from './dto/create-gato.dto';
import { UpdateGatoDto } from './dto/update-gato.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Gato } from './entities/gato.entity';
import { RazasService } from 'src/razas/razas.service';
import { VacunasService } from 'src/vacunas/vacunas.service';
import { Vacuna } from 'src/vacunas/entities/vacuna.entity';

@Injectable()
export class GatosService {

  constructor(
    @InjectRepository(Gato) private gatoRepository: Repository<Gato>,
    private readonly razaService: RazasService,
    private readonly vacunaService: VacunasService,
  ) { }

  async create(createGatoDto: CreateGatoDto) {
    const raza = await this.razaService.findByName(createGatoDto.raza);
    let vacunas: Vacuna[] = [];
    if (createGatoDto.vacunas) {
      vacunas = await Promise.all(createGatoDto.vacunas.map((nombre) => this.vacunaService.findByName(nombre)));
    }
    const gato = this.gatoRepository.create({
      nombre: createGatoDto.nombre,
      edad: createGatoDto.edad,
      color: createGatoDto.color,
      raza,
      vacunas
    });
    return this.gatoRepository.save(gato);
  }

  async findAll() {
    return await this.gatoRepository.find({
      relations: ['raza', 'vacunas'],
    });
  }

  async findOne(id: number) {
    const gato = await this.gatoRepository.findOne({
      where: { id },
      relations: ['raza', 'vacunas'],
    });

    if (!gato) {
      throw new NotFoundException(`Gato con id ${id} no encontrado`);
    }

    return gato;
  }

  async update(id: number, updateGatoDto: UpdateGatoDto) {
    // const result = await this.gatoRepository.update(id, updateGatoDto);
    // if (result.affected === 0) {
    //   throw new NotFoundException(`Gato con id ${id} no encontrado`);
    // }
    // return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.gatoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Gato con id ${id} no encontrado`);
    }
    return { message: `Gato con id ${id} eliminado correctamente` };
  }
}
