import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
  @Column()
  test: string;
  // Otros campos según tu modelo
}