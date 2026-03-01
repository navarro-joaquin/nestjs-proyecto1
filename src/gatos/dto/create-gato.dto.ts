import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsOptional, IsString } from "class-validator";

export class CreateGatoDto {

  @ApiProperty({
    description: 'Nombre del gato',
    example: 'Misi'
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Raza del gato',
    example: 'Siamés'
  })
  @IsString()
  raza: string;

  @ApiProperty({
    description: 'Edad del gato',
    example: 2
  })
  @IsInt()
  @IsOptional()
  edad: number;

  @ApiProperty({
    description: 'Color del gato',
    example: 'Blanco'
  })
  @IsString()
  color: string;

  @ApiProperty({
    description: 'Vacunas del gato',
    example: ['Rabia', 'Moquillo']
  })
  @IsArray()
  @IsOptional()
  vacunas: string[];
}
