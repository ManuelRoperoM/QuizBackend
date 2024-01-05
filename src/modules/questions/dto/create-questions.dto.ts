import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateQuestions{
    @IsString()
    readonly  category: string;

    @IsString()
    readonly question: string;

    @IsBoolean()
    readonly correctAnswer: boolean;

    @IsNumber()
    readonly quizId: number;
}