import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AnswersService } from './answers.service';

@Controller('answers')
export class AnswersController {
    constructor (private readonly answerService: AnswersService) {}

    @Post()
    async registerResponses(@Body() body:any){
        return await this.answerService.registerResponses(body)
    }

    @Get()
    async findAllResponses(){
        return await this.answerService.findAllAnswers();
    }

    @Get('/:id')
    async findAnswerById(@Param('id') id:number){
        return await this.answerService.findAnswerById(id)
    }

    @Get('user/:userId')
    async findAnswersByUser(@Param('userId') userId:number){
        return this.answerService.findAnswersByUser(userId);
    }

    @Patch()
    async updateAnswer(@Body() body:any){
        return await this.answerService.updateAnswer(body)
    }

    @Delete('/:id')
    async deleteAnswers(@Param('id') id:number){
        return await this.answerService.updateDelete(id);
    }
}
