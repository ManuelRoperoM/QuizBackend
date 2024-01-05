import { Body, Controller, Post } from '@nestjs/common';
import { AnswersService } from './answers.service';

@Controller('answers')
export class AnswersController {
    constructor (private readonly answerService: AnswersService) {}

    @Post()
    async registerResponses(@Body() body:any){
        return this.answerService.registerResponses(body)
    }

}
