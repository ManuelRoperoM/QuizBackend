import { Controller,Get,Post,Put,Delete,Body } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto';

@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) {}

    @Post()
    async createQuiz(@Body() data:CreateQuizDto){
        return await this.quizService.createQuiz(data);
    }
}
