import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'alvaro3@mail.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: '123456'
  })
  @IsString()
  @MinLength(6)
  password: string;
}