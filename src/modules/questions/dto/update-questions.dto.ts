import { IsBoolean, IsNumber, IsString } from "class-validator";

export class UpdateQuestion{
    @IsNumber()
    readonly id:number;

    @IsString()
    readonly category:string;

    @IsString()
    readonly question:string;

    @IsBoolean()
    readonly correctAnswer: boolean;
}