import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from '../modules/quiz/quiz.entity';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'user',
        password: 'secret',
        database: 'QUIZ',
        entities: [Quiz],
        synchronize: true,
      }), 
      TypeOrmModule.forFeature([Quiz])]
  })
  export class DatabaseModule {}