import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestions, UpdateQuestion } from './dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) {}

    @Post()
    @ApiOperation({ summary: 'Genera en bases de datos las preguntas de un quiz' })
    @ApiResponse({ status: 200, description: 'Preguntas guardadas con exito'})
    @ApiResponse({ status: 400, description: 'Catch error msge'})
    async generateQuestions(@Body() body: any){
        return this.questionsService.generateQuestions(body.quizId);
    }

    @Post('/createQuestion')
    @ApiOperation({ summary: 'Crea en bases de datos una nueva pregunta de un quiz' })
    @ApiBody({ type: CreateQuestions, examples: {example1:{ value: {
        category: "Logica",
        question: "Todos los cuervos son aves negras.",
        correctAnswer : false,
        quizId: 3
    }}} })
    @ApiResponse({ status: 200, description: 'Pregunta creada correctamente'})
    @ApiResponse({ status: 400, description: 'Catch error msge'})
    async createQuestion(@Body() body:CreateQuestions){
        return this.questionsService.createQuestion(body)
    }

    @Get()
    @ApiOperation({ summary: 'Obtiene todas las preguntas registradas en bases de datos' })
    @ApiResponse({ status: 200, description: 'Preguntas encontradas con exito' })
    @ApiResponse({ status: 400, description: 'Catch error msge' })
    async findAllQuestions(){
        return this.questionsService.findAllQuestions();
    }
    
    @Get('/quizQuestions/:quizId')
    @ApiOperation({ summary: 'Obtiene todas las preguntas de un quiz.' })
    @ApiParam({ name: 'quizId', description: 'ID del quiz', type: 'number' })
    @ApiResponse({ status: 200, description: 'Preguntas encontradas con exito' })
    @ApiResponse({ status: 202,description: 'No se encontraron preguntas del quiz con ID: ${quizId}'})
    @ApiResponse({ status: 400, description: 'Catch error msge' })
    async findQuestionsByQuiz(@Param('quizId') quizId: number){
        return this.questionsService.findQuestionsByQuiz(quizId);
    }

    @Patch()
    @ApiBody({ type: UpdateQuestion,examples: {example1:{ value: {
            id: 54,
            category: "Logica",
            question: "Si todos los perros ladran y Firulais está ladrando, entonces Firulais es un perro.",
            correctAnswer : true
    }}} })
    @ApiOperation({ summary: 'Actualiza una pregunta registrada por ID'})
    @ApiResponse({ status: 200, description: 'Pregunta actualizada con exito' })
    @ApiResponse({ status: 202, description: 'No existe el quiz con id : ${id}' })
    @ApiResponse({status:400, description: 'Catch error msge'})
    async updateQuestions(@Body() body: UpdateQuestion){
        return this.questionsService.updateQuestion(body);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Elimina una pregunta de la base de datos' })
    @ApiParam({ name: 'quizId', description: 'ID de la pregunta', type: 'number' })
    @ApiResponse({ status: 200, description: 'Pregunta eliminada correctamente' })
    @ApiResponse({ status: 202,description: 'No se encontro pregunta a eliminar'})
    @ApiResponse({ status: 400, description: 'Catch error msge' })
    async deleteQuestion(@Param('id') id:number){
        return this.questionsService.deleteQuestion(id);
    }

}
