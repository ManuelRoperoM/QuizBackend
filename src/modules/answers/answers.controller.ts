import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { UpdateAnswer, UserAnswerDto } from './dto';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('answers')
export class AnswersController {
    constructor (private readonly answerService: AnswersService) {}

    @Post()
    @ApiBody({ type: UserAnswerDto, examples: {example1:{ value: {userId: 2,answers: [
            {
                response: true,
                questionId: 35
            },
            {
                response: false,
                questionId: 36
            },
            {
                response: true,
                questionId: 37
            },
            {
                response: false,
                questionId: 38
            }
        ]
    }}} })
    @ApiOperation({ summary: 'Registra en bases de datos las respuestas de un usuario' })
    @ApiResponse({ status: 200, description: 'Respuestas registradas exitosamente'})
    @ApiResponse({ status: 400, description: 'Catch error msge'})
    async registerResponses(@Body() body:UserAnswerDto){
        return await this.answerService.registerResponses(body)
    }

    @Get()
    @ApiOperation({ summary: 'Obtiene todas las respuestas registradas por los usuarios en bases de datos' })
    @ApiResponse({ status: 200, description: 'Respuestas encontradas exitosamente' })
    @ApiResponse({ status: 400, description: 'Catch error msge' })
    async findAllResponses(){
        return await this.answerService.findAllAnswers();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Obtiene una respuesta por ID' })
    @ApiParam({ name: 'id', description: 'ID del elemento', type: 'number' })
    @ApiResponse({ status: 200, description: 'Respuesta encontrada con exito' })
    @ApiResponse({ status: 202, description: 'No se encontro respuesta con id: ${id}' })
    @ApiResponse({ status: 400, description: 'Catch error msge' })
    async findAnswerById(@Param('id') id:number){
        return await this.answerService.findAnswerById(id)
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Obtiene todas las respuestaas registradas por un usario usando su ID' })
    @ApiParam({ name: 'userId', description: 'ID del usuario', type: 'number' })
    @ApiResponse({ status: 200, description: 'Respuestas encontradas exitosamente' })
    @ApiResponse({ status: 202, description: 'No existe usuario con id: ${userId}' })
    @ApiResponse({ status: 202, description: 'Catch error msge' })
    async findAnswersByUser(@Param('userId') userId:number){
        return this.answerService.findAnswersByUser(userId);
    }

    @Patch()
    @ApiBody({ type: UpdateAnswer,examples: {example1:{ value: {
        "id": 23,
        "response": false
    }}} })
    @ApiOperation({ summary: 'Actualiza una respuesta registrada por ID'})
    @ApiResponse({ status: 200, description: 'Respuesta actualizada correctamente' })
    @ApiResponse({ status: 202, description: 'No se encontro respuesta con id: ${id}' })
    @ApiResponse({status:400, description: 'Catch error msge'})
    async updateAnswer(@Body() body:UpdateAnswer){
        return await this.answerService.updateAnswer(body)
    }

    @Delete('/:id')
    @ApiOperation({summary: 'Elimina una respuesta en base de datos por ID'})
    @ApiParam({ name: 'id', description: 'ID de la pregunta', type: 'number' })
    @ApiResponse({ status: 200, description: 'Pregunta eliminada con exito' })
    @ApiResponse({ status: 202, description: 'No se encontro repuesta registrada con id: ${id}' })
    @ApiResponse({ status: 400, description: 'No se encontro repuesta registrada con id: ${id}' })
    async deleteAnswers(@Param('id') id:number){
        return await this.answerService.updateDelete(id);
    }
}
