import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Rol } from './enums/rol.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async register({ name, email, password }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new NotFoundException('El usuario ya existe');
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    const rolValue = (typeof arguments[0].rol === 'string' && arguments[0].rol) ? arguments[0].rol : Rol.USER;

    await this.usersService.create({ name, email, password: hashPassword, rol: rolValue});

    return {
      name,
      email
    }
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException('Contraseña incorrecta');
    }

    const payload = {
      email: user.email,
      rol: user.rol
    }

    const token = await this.jwtService.signAsync(payload);

    return {
      name: user.name,
      email: user.email,
      rol: user.rol,
      token
    }
  }
}
