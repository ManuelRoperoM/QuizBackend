import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionService: QuestionsService) {}

    @Post()
    async generateQuestions(@Body() body: any){
        return this.questionService.generateQuestions(body.quizId);
    }

    @Get()
    async findAllQuestions(){
        return this.questionService.findAllQuestions();
    }
    
    @Get('/quizQuestions/:quizId')
    async findQuestionsByQuiz(@Param('quizId') quizId: number){
        return this.questionService.findQuestionsByQuiz(quizId);
    }


}
