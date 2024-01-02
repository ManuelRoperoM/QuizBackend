import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';
import { CreateQuizDto } from './dto';
@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private readonly quizRepository: Repository<Quiz>,
    ) {}
    async createQuiz(data:CreateQuizDto){
        //Crear data quiz
        const existQuiz = await this.quizRepository.find({ where: { name: data.name } });
        console.log(existQuiz.length)
        if (existQuiz.length > 0) {
            return {
                status: 200,
                msg: "El Quiz con nombre "+data.name+" ya existe y no puede ser creado nuevamente"
            };      
        }else{
         const newQuiz = await this.quizRepository.save({name : data.name});
         return {
            status: 200,
            msg: "Quiz "+data.name+" creado correctamente"
        };
        }

    }
}
