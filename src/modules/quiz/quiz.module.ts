import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';
import { QuestionsService } from '../questions/questions.service';
import { Questions } from '../questions/questions.entity';
//import { QuestionService } from '../question/question.service';
//import { Question } from '../question/question.entity';
import { HttpModule } from '@nestjs/axios';
@Module({
  //imports: [TypeOrmModule.forFeature([Quiz]),HttpModule.register({})],
  imports: [TypeOrmModule.forFeature([Quiz, Questions]),HttpModule.register({})],
  controllers: [QuizController],
  providers: [QuizService, QuestionsService]
})
export class QuizModule {}
