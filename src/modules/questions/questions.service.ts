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

    async findAllQuestions(){
        try {
            
            const allQuestions = await this.questionsRepository.find();
            return{
                status: true,
                msge: "Preguntas encontradas con exito",
                data: allQuestions
            }
            
        } catch (error) {
            return {
                status: false,
                msge: error.message
            }
        }
    }

    async findQuestionsByQuiz(quizId : number){
        
        try {
            const quisQuestions =  await this.questionsRepository.findBy({quizId:quizId});
            if (quisQuestions.length > 0) {
                return{
                    status: true,
                    msge: "Preguntas encontradas con exito",
                    data: quisQuestions
                }
            }else{
                return{
                    status: false,
                    msge: "No se encontraron preguntas del quiz con ID: "+quizId
                }
            }
        } catch (error) {
            return {
                status: false,
                msge: error.message
            }
        }
    }

    async updateQuestion(data:any){
        try {
            const existQuestion = await this.questionsRepository.findBy({id: data.id});
            if (existQuestion.length == 0) {
                return{
                    status: false,
                    msge: "No existe el quiz con id "+data.id
                }
            }else {
                await this.questionsRepository.update(data.id,data);
                return{
                    status: true,
                    msge: "Pregunta actualizada con exito"
                } 
            }
        } catch (error) {
            return {
                status:false,
                msge: error.message
            }
        }
    }
}