import { Raza } from "src/razas/entities/raza.entity";
import { Vacuna } from "src/vacunas/entities/vacuna.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Gato {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  edad: number;

  @Column()
  color: string;

  @ManyToOne(() => Raza, (raza) => raza.gatos)
  @JoinColumn({ name: 'raza_id' })
  raza: Raza;

  @ManyToMany(() => Vacuna, (vacuna) => vacuna.gatos)
  @JoinTable()
  vacunas: Vacuna[];
}
