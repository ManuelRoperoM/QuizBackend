import { isString } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answers } from "../answers/answers.entity";

@Entity()
export class Users{
    @PrimaryGeneratedColumn('increment')
    id:number

    @Column()
    name: string

    @Column()
    email: string

    @OneToMany(() => Answers, (answers) => answers.quiz,{cascade:true, onDelete: 'CASCADE'})
    answers: Answers
}