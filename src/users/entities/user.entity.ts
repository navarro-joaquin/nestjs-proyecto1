import { IsOptional } from "class-validator";
import { Rol } from "../../auth/enums/rol.enum";
import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class User {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Rol, default: Rol.USER })
  @IsOptional()
  rol: Rol;

  @DeleteDateColumn()
  deletedAt: Date;
}
