import { IsString } from "class-validator";

export class CreateQuizDto {
    @IsString()
    readonly name : string;
}
