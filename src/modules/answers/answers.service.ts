import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answers } from './answers.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { UpdateAnswer, UserAnswerDto } from './dto';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(Answers)
        private readonly answersRepository: Repository<Answers>,
        private readonly usersService: UsersService
    ){}

    async registerResponses(data: UserAnswerDto){
        try {
            const responses = data.answers;
            await Promise.all(responses.map(async (element) => {
                await this.answersRepository.save({
                    response: element.response,
                    userId: data.userId,
                    questionId: element.questionId
                });
            }));
            return {
                status: 200,
                operation: true,
                msge: "Respuestas registradas exitosamente"
            }
        } catch (error) {
            return {
                status: 404,
                operation: false,
                msge: error.message
            }
        }
    }
    async findAllAnswers(){
        try {
            const answers = await this.answersRepository.find();
            return{
                status: 200,
                operation: true,
                msge: "Respuestas encontradas exitosamente",
                data: answers
            }
        } catch (error) {
            return{
                status: 400,
                operation: false,
                msge: error.message
            }
        }
    }
    async findAnswerById(id:number){
        try {
            const answer = await this.answersRepository.findBy({id:id})
            if (answer.length > 0) {
                return{
                    status: 200,
                    operation: true,
                    msge: "Respuesta encontrada con exito",
                    data: answer
                }
            } else {
                return{
                    status: 202,
                    operation: false,
                    msge: "No se encontro respuesta con id: "+id
                }
            }
        } catch (error) {
            return{
                status: 400,
                operation: false,
                msge: error.message
            }
        }
    }
    async findAnswersByUser(userId: number){
        try {
            const user = await this.usersService.findUserById(userId);
            if (user.operation) {
                const answers = await this.answersRepository.findBy({userId:userId})
                return{
                    status: 200,
                    operation: false,
                    msge: "Respuestas encontradas satisfacoriamente",
                    data: answers
                }
            } else {
                return{
                    status:202,
                    operation: false,
                    msge:"No existe usuario con id: "+userId
                }
            }
        } catch (error) {
            return{
                status:400,
                operation: false,
                msge: error.message
            }
        }
    }
    async updateAnswer(data:UpdateAnswer){
        try {
            const existAnswer = await this.answersRepository.findBy({id:data.id});
            if (existAnswer.length > 0) {
                await this.answersRepository.update(data.id, data);
                return{
                    status: 200,
                    operation: true,
                    msge: "Respuesta actualizada correctamente"
                }
            }else {
                return{
                    status: 202,
                    operation: false,
                    msge: "No se encontro respuesta con id: "+data.id
                }
            }
        } catch (error) {
            return{
                status: 400,
                operation: false,
                msge: error.message
            }
        }
    }
    async updateDelete(id:number){
        try {
            const answerToDelete = await this.answersRepository.findBy({id:id});
            if (answerToDelete.length > 0) {
                await this.answersRepository.remove(answerToDelete)
                return {
                    status: 200,
                    operation: true,
                    msge: "Pregunta eliminada con exito"
                }
            } else {
                return{
                    status: 202,
                    operation: false,
                    msge: "No se encontro repuesta registrada con id: "+id
                }
            }
        } catch (error) {
            return{
                status: 400,
                operation: false,
                msge: error.message
            }
        }
    }
}
