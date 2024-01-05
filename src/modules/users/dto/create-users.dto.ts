import { IsString } from "class-validator";

export class CreateUsers{
    @IsString()
    name: string

    @IsString()
    email:string
}