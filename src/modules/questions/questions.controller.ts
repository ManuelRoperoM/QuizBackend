import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestions, UpdateQuestion } from './dto';

@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) {}

    @Post()
    async generateQuestions(@Body() body: any){
        return this.questionsService.generateQuestions(body.quizId);
    }

    @Post('/createQuestion')
    async createQuestion(@Body() body:CreateQuestions){
        return this.questionsService.createQuestion(body)
    }

    @Get()
    async findAllQuestions(){
        return this.questionsService.findAllQuestions();
    }
    
    @Get('/quizQuestions/:quizId')
    async findQuestionsByQuiz(@Param('quizId') quizId: number){
        return this.questionsService.findQuestionsByQuiz(quizId);
    }

    @Patch()
    async updateQuestions(@Body() body: UpdateQuestion){
        return this.questionsService.updateQuestion(body);
    }

    @Delete('/:id')
    async deleteQuestion(@Param('id') id:number){
        return this.questionsService.deleteQuestion(id);
    }

}
