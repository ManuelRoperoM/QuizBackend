import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answers } from './answers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(Answers)
        private readonly answersRepository: Repository<Answers>
    ){}

    async registerResponses(data: any){
        try {
            
            const responses = data.answers;
            console.log(data)
            await Promise.all(responses.map(async (element) => {
                await this.answersRepository.save({
                    response: element.response,
                    userId: data.userId,
                    questionId: element.questionId
                });
            }));
            return {
                status: true,
                msge: "Respuestas registradas exitosamente"
            }
        } catch (error) {
            return {
                status: false,
                msge: error.message
            }
        }
    }
}
