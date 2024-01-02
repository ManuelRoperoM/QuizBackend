import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

}