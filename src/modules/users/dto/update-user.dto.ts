import { IsNumber, IsString } from "class-validator";

export class UpdateUser{
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    email: string;
}