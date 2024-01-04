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

    async findAllQuizes(){
        try {
            const allQuizzes = await this.quizRepository.find();
            return{
                status: true,
                msg: "Quizes encontrados con exito",
                data: allQuizzes
            }
            
        } catch (error) {
            return {
                status: false,
                msg: error.message
            }   
        }
    }

    async findQuizById(id: number){
        try {
            const quizById = await this.quizRepository.findBy({id:id})
            if (quizById.length > 0) {
                return {
                    status: true,
                    msge: "Quiz encontrado",
                    data: quizById
                }
            }else{
                return {
                    status: true,
                    msge: "No se encontro Quiz con id: "+id,
                }
            }
        } catch (error) {
            return {
                status: false,
                msge: error.message
            }
        }
    }

    async updateQuiz(data: any){
        try {
            const existQuiz = await this.quizRepository.find({ where: { name: data.name } });
            if (existQuiz.length == 0) {
                await this.quizRepository.update(data.id,data);
                return({
                    status: true,
                    msge: "servicio actualizado con exito"
                })
            }else{
                return{
                    status: false,
                    msge: "Ya existe el nombre "+data.name+" y no se puede usar este nombre"
                }
            }
        } catch (error) {
            return {
                status: true,
                msg: error.message
            }
        }
    }

    async deleteQuiz(id:number){
        try {
            const quizToDelete = await this.quizRepository.findBy({id: id});
            if (quizToDelete.length == 0) {
                return {
                    status: false,
                    msge: "No se encontro quiz a eliminar"
                }
            }else{
                await this.quizRepository.remove(quizToDelete);
                return {
                    status: true,
                    msge: "Quiz eliminado exitosamente"
                }
            }

        } catch (error) {
            return {
                status: false,
                msge: error.message
            }
        }
    }


}
