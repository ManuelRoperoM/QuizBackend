import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNumber, ValidateNested } from "class-validator";

class AnswerDto{
    @IsBoolean()
    response: boolean;

    @IsNumber()
    questionId: number;
}

export class UserAnswerDto{
    @IsNumber()
    userId: number;

    @IsArray()
    @ValidateNested()
    @Type(() => AnswerDto)
    answers: AnswerDto[];
}