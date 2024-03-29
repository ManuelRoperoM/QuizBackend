import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from './questions.entity';
import { HttpModule } from '@nestjs/axios';
import { Answers } from '../answers/answers.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Questions,Answers]),HttpModule.register({})], 
  providers: [QuestionsService],
  controllers: [QuestionsController]
})
export class QuestionsModule {}
