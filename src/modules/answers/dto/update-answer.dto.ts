import { IsBoolean, IsNumber } from "class-validator";

export class UpdateAnswer{
    @IsNumber()
    id: number;

    @IsBoolean()
    response: boolean;
}