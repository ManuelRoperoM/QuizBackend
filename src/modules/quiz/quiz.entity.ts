import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Questions } from '../questions/questions.entity';
//import { Question } from '../question/question.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Questions, (questions) => questions.quiz, { cascade: true }) // Asegúrate de usar el nombre correcto de la propiedad en Question
  questions: Questions[];
}