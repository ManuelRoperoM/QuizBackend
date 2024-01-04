import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';
import { CreateQuizDto } from './dto';
import { QuestionsService } from '../questions/questions.service';
@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private readonly quizRepository: Repository<Quiz>,
        private readonly questionsService: QuestionsService,
    ) {}
    async createQuiz(data:CreateQuizDto){
        //Crear data quiz
        try {
            const existQuiz = await this.quizRepository.find({ where: { name: data.name } });
            if (existQuiz.length > 0) {
                return {
                    status: "Error",
                    msg: "El Quiz con nombre "+data.name+" ya existe y no puede ser creado nuevamente"
                };      
            }else{
                const newQuiz = await this.quizRepository.save({name : data.name});
                const generateQuestions = await this.questionsService.generateQuestions(newQuiz.id);

                if(generateQuestions.status){
                    return {
                        status: true,
                        msg: "Quiz "+data.name+" creado correctamente"
                    };
                }else{
                    await this.quizRepository.delete({ id: newQuiz.id })
                    return{
                        status: false,
                        msg: "Error al generar las preguntas, quiz no guardado"
                    }
                }
            }   
        } catch (error) {
            return{
                status: false,
                msg: error
            }
        }
    }
}
