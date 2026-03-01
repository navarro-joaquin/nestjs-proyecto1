import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GatosService } from './gatos.service';
import { CreateGatoDto } from './dto/create-gato.dto';
import { UpdateGatoDto } from './dto/update-gato.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Gatos')
@Controller('gatos')
export class GatosController {
  constructor(private readonly gatosService: GatosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo gato' })
  @ApiResponse({ status: 201, description: 'Gato creado exitosamente', type: CreateGatoDto })
  create(@Body() createGatoDto: CreateGatoDto) {
    return this.gatosService.create(createGatoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los gatos' })
  @ApiResponse({ status: 200, description: 'Lista de gatos obtenida exitosamente', type: [CreateGatoDto] })
  findAll() {
    return this.gatosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un gato por id' })
  findOne(@Param('id') id: string) {
    return this.gatosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un gato por id' })
  update(@Param('id') id: string, @Body() updateGatoDto: UpdateGatoDto) {
    return this.gatosService.update(+id, updateGatoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un gato por id' })
  remove(@Param('id') id: string) {
    return this.gatosService.remove(+id);
  }
}
