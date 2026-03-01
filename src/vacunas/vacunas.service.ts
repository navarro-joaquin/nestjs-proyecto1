import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVacunaDto } from './dto/create-vacuna.dto';
import { UpdateVacunaDto } from './dto/update-vacuna.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacuna } from './entities/vacuna.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VacunasService {

  constructor(
    @InjectRepository(Vacuna)
    private readonly vacunaRepository: Repository<Vacuna>,
  ) { }


  async create(createVacunaDto: CreateVacunaDto) {
    const vacuna = this.vacunaRepository.create(createVacunaDto);
    return await this.vacunaRepository.save(vacuna);
  }

  async findAll() {
    return await this.vacunaRepository.find();
  }

  async findOne(id: number) {
    const vacuna = await this.vacunaRepository.findOneBy({ id });
    if (!vacuna) {
      throw new NotFoundException(`Vacuna con id ${id} no encontrada`);
    }
    return vacuna;
  }

  async update(id: number, updateVacunaDto: UpdateVacunaDto) {
    const vacuna = await this.findOne(id);
    this.vacunaRepository.merge(vacuna, updateVacunaDto);
    return await this.vacunaRepository.save(vacuna);
  }

  async remove(id: number) {
    const vacuna = await this.findOne(id);
    return await this.vacunaRepository.remove(vacuna);
  }

  async findByName(name: string) {
    const vacuna = await this.vacunaRepository.findOneBy({ nombre: name });
    if (!vacuna) {
      throw new NotFoundException(`Vacuna con nombre ${name} no encontrada`);
    }
    return vacuna;
  }
}
