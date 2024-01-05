import { IsNumber, IsString } from "class-validator";

export class UpdateQuiz{
    @IsNumber()
    id:number

    @IsString()
    name: string;
}