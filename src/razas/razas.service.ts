import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRazaDto } from './dto/create-raza.dto';
import { UpdateRazaDto } from './dto/update-raza.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Raza } from './entities/raza.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RazasService {

  constructor(
    @InjectRepository(Raza)
    private readonly razaRepository: Repository<Raza>,
  ) {}

  async create(createRazaDto: CreateRazaDto) {
    const raza = this.razaRepository.create(createRazaDto);
    return await this.razaRepository.save(raza);
  }

  async findAll() {
    return await this.razaRepository.find();
  }

  async findOne(id: number) {
    const raza = await this.razaRepository.findOneBy({ id });
    if (!raza) {
      throw new NotFoundException(`Raza con id ${id} no encontrada`);
    }
    return raza;
  }

  async findByName(nombre: string) {
    const raza = await this.razaRepository.findOneBy({ nombre });
    if (!raza) {
      throw new NotFoundException(`Raza con nombre ${nombre} no encontrada`);
    }
    return raza;
  }

  async update(id: number, updateRazaDto: UpdateRazaDto) {
    const raza = await this.findOne(id);
    this.razaRepository.merge(raza, updateRazaDto);
    return await this.razaRepository.save(raza);
  }

  async remove(id: number) {
    const raza = await this.findOne(id);
    return await this.razaRepository.remove(raza);
  }
}
