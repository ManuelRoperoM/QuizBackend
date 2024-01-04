import { Body, Controller, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionService: QuestionsService) {}

    @Post()
    async generateQuestions(@Body() body: any){
        return this.questionService.generateQuestions(body.quizId);
    }
}
