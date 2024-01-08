import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Questions } from './questions.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { CreateQuestions } from './dto';
import { UpdateQuestion } from './dto';
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
                    correctAnswer: question.correct_answer == 'False' ? false : true,
                    //correctAnswer : question.correct_answer,
                    quizId: quizId,
                });
            }));
            return{ 
                    status : 200,
                    operation: true,
                    msg: "Preguntas guardadas con exito",
                    questions: questionData
            }
        } catch (error) {
            return { 
                status:400,
                operation: false,
                msg: error.message
            };
        }
    }

    async createQuestion(data: CreateQuestions){
        try {
            await this.questionsRepository.save({
                category: data.category,
                question: data.question,
                correctAnswer: data.correctAnswer,
                quizId: data.quizId
            })
            return{
                status: 200,
                operation: true,
                msge: "Pregunta creada correctamente"
            }
        } catch (error) {
            return {
                status: 400,
                operation: false,
                msge: error.message
            }
        }
    }

    async findAllQuestions(){
        try {
            
            const allQuestions = await this.questionsRepository.find();
            return{
                status: 200,
                operation:true,
                msge: "Preguntas encontradas con exito",
                data: allQuestions
            }
            
        } catch (error) {
            return {
                status: 200,
                operation: false,
                msge: error.message
            }
        }
    }

    async findQuestionsByQuiz(quizId : number){
        
        try {
            const quisQuestions =  await this.questionsRepository.findBy({quizId:quizId});
            if (quisQuestions.length > 0) {
                return{
                    status: 200,
                    operation:true,
                    msge: "Preguntas encontradas con exito",
                    data: quisQuestions
                }
            }else{
                return{
                    status: 202,
                    operation: false,
                    msge: "No se encontraron preguntas del quiz con ID: "+quizId
                }
            }
        } catch (error) {
            return {
                status: 400,
                operation: false,
                msge: error.message
            }
        }
    }

    async updateQuestion(data:UpdateQuestion){
        try {
            const existQuestion = await this.questionsRepository.findBy({id: data.id});
            if (existQuestion.length == 0) {
                return{
                    status: 202,
                    operation: false,
                    msge: "No existe el quiz con id "+data.id
                }
            }else {
                await this.questionsRepository.update(data.id,data);
                return{
                    status: 200,
                    operation: true,
                    msge: "Pregunta actualizada con exito"
                } 
            }
        } catch (error) {
            return {
                status:400,
                operation:false,
                msge: error.message
            }
        }
    }

    async deleteQuestion(id:number){
        try {
            const quiestionToDelete = await this.questionsRepository.findBy({id:id})
            if (quiestionToDelete.length > 0) {
                await this.questionsRepository.remove(quiestionToDelete);
                return{
                    status: 200,
                    operation: true,
                    msge: "Pregunta eliminada correctamente"
                }
            } else {
                return {
                    status: 202,
                    operation: false,
                    msge: "No se encontro pregunta a eliminar"
                }
            }
        } catch (error) {
            return {
                status: 400,
                operation: false,
                msge: error.message
            }
        }
    }
}