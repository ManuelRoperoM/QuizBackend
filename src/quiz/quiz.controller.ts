import { Controller,Get,Post,Put,Delete,Body } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) {}

    @Post()
    createQuiz(@Body() data:any){
        return this.quizService.createQuiz(data);
    }
}
