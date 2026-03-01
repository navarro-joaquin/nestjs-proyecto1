import { Gato } from "src/gatos/entities/gato.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Raza {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Gato, (gato) => gato.raza)
  gatos: Gato[];
}
