import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Quiz } from "../quiz/quiz.entity";

@Entity()
export class Questions {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @IsString({ message: 'La categoría debe ser una cadena de caracteres.' })
    @IsNotEmpty({ message: 'La categoría no puede estar vacía.' })
    @Column()
    category: string;

    @IsString({ message: 'La pregunta debe ser una cadena de caracteres.' })
    @IsNotEmpty({ message: 'La pregunta no puede estar vacía.' })
    @Column()
    question: string;

    @IsBoolean({ message: 'La respuesta correcta debe ser un valor booleano.' })
    //@Transform(value => value === 'true' || value === true, { toClassOnly: true }) // Convertir valores de tipo string a boolean
    @Column()
    correctAnswer: boolean;

    @Column()
    quizId: number;

    // Definir la relación ManyToOne con Quiz
    @ManyToOne( () => Quiz, (quiz) => quiz.questions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'quizId' })
    quiz: Quiz;
}