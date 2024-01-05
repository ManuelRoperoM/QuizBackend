import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AnswersService } from './answers.service';

@Controller('answers')
export class AnswersController {
    constructor (private readonly answerService: AnswersService) {}

    @Post()
    async registerResponses(@Body() body:any){
        return this.answerService.registerResponses(body)
    }

    @Get()
    async findAllResponses(){
        return this.answerService.findAllAnswers();
    }

    @Get('/:id')
    async findAnswerById(@Param('id') id:number){
        return this.answerService.findAnswerById(id)
    }

    @Get('user/:userId')
    async findAnswersByUser(@Param('userId') userId:number){
        return this.answerService.findAnswersByUser(userId);
    }

}
