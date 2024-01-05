import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Questions } from "../questions/questions.entity";
import { Users } from "../users/users.entity";

@Entity()
export class Answers{

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    response: boolean

    @Column()
    userId:number

    @Column()
    questionId:number

    @ManyToOne( () => Questions, (questions) => questions.answers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'questionId' })
    quiz: Questions;

    @ManyToOne( () => Users, (users) => users.answers, { onDelete: 'CASCADE'})
    @JoinColumn({name: 'userId'})
    users:Users
}