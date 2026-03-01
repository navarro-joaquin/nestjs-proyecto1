import { IsString, MinLength } from "class-validator";

export class CreateVacunaDto {

  @IsString()
  @MinLength(3)
  nombre: string;
  
}
