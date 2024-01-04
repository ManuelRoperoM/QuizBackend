import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from '../modules/quiz/quiz.entity';
import { Questions } from 'src/modules/questions/questions.entity';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'user',
        password: 'secret',
        database: 'QUIZ',
        entities: [Quiz, Questions],
        synchronize: true,
      }), 
      TypeOrmModule.forFeature([Quiz, Questions])]
  })
  export class DatabaseModule {}