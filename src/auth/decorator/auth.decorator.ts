import { applyDecorators, UseGuards } from "@nestjs/common";
import { Rol } from "../enums/rol.enum";
import { Roles } from "./rol.decorator";
import { AuthGuard } from "../auth.guard";
import { RolesGuard } from "../roles.guard";

export function Auth(rol: Rol) {
  return applyDecorators(
    Roles(rol),
    UseGuards(AuthGuard, RolesGuard)
  );
}