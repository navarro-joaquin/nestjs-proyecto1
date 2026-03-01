import { Gato } from "src/gatos/entities/gato.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vacuna {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToMany(() => Gato, (gato) => gato.vacunas)
  gatos: Gato[];
}
