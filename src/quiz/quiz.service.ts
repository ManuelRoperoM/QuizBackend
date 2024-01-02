import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizService {
    createQuiz(data:any){
        //Crear data quiz
        return "Api funcionando correctamente "+data.name; 
    }
}
