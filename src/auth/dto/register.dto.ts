import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { Rol } from "../enums/rol.enum";

export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(Rol)
  @IsOptional()
  rol?: Rol;
}