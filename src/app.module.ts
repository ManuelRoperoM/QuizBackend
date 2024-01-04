import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './modules/quiz/quiz.module';
import { DatabaseModule } from './database/database.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Quiz } from './modules/quiz/quiz.entity';
import { Test } from './modules/test/test.entity';
import { TestModule } from './modules/test/test.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { Questions } from './modules/questions/questions.entity';
@Module({
  imports: [QuizModule, DatabaseModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'user',
    password: 'secret',
    database: 'QUIZ',
    entities: [Quiz,Test,Questions],
    //entities: [Quiz,Test],
    synchronize: true,
  }), TestModule, QuestionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
