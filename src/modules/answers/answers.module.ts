import { Module } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answers } from './answers.entity';
import { Users } from '../users/users.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Answers,Users])],
  controllers: [AnswersController],
  providers: [AnswersService,UsersService]
})
export class AnswersModule {}
