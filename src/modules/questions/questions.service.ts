import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Questions } from './questions.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(Questions)
        private readonly questionsRepository: Repository<Questions>,
        private readonly httpService: HttpService
    ){}
    async generateQuestions(quizId: number){
        try {
            const questionsAPi = "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean";
            const response = await this.httpService.get(questionsAPi).toPromise();
            const questionData = response.data.results
            await Promise.all(questionData.map(async (question) => {
                await this.questionsRepository.save({
                    category: question.category,
                    question: question.question,
                    correctAnswer: question.correct_answer,
                    quizId: quizId,
                });
            }));
            return{ 
                    status : true,
                    msg: "Preguntas guardadas con exito",
                    questions: questionData
            }
        } catch (error) {
            return { 
                status: false,
                msg: error.message
            };
        }
    }
}
