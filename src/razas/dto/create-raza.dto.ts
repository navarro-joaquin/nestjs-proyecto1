import { IsString } from "class-validator";

export class CreateRazaDto {

  @IsString()
  nombre: string;

}
