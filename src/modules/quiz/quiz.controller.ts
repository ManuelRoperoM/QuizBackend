import { Controller,Get,Post,Put,Delete,Body, Param, Patch } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto';

@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) {}
    
    @Post()
    async createQuiz(@Body() data:CreateQuizDto){
        return await this.quizService.createQuiz(data);
    }

    @Get()
    async findAllQuizzes(){
        return await this.quizService.findAllQuizes();
    }

    @Get('findById/:id')
    async findQuizById(@Param('id') id: number){
        return await this.quizService.findQuizById(id);
    }

    @Patch()
    async updateQuiz(@Body() data:any){
        return await this.quizService.updateQuiz(data)
    }

    @Delete('/:id')
    async deleteQuizById(@Param('id') id:number){
        return await this.quizService.deleteQuiz(id);
    }

}
