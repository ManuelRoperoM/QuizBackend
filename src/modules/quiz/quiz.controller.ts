import { Controller,Get,Post,Put,Delete,Body, Param, Patch } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto, UpdateQuiz } from './dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService) {}
    
    @Post()
    @ApiBody({ type: CreateQuizDto, examples: {example1:{ value: 
    {
        "name": "My super Quiz",
    }}} })
    @ApiOperation({ summary: 'Genera un quiz con preguntas aleatorias.' })
    @ApiResponse({ status: 200, description: 'Quiz ${name} creado correctamente'})
    @ApiResponse({ status: 202, description: 'El Quiz con nombre ${name} ya existe y no puede ser creado nuevamente'})
    @ApiResponse({ status: 201, description: 'Error al generar las preguntas, quiz no guardado'})
    @ApiResponse({ status: 400, description: 'Catch error msge'})
    async createQuiz(@Body() data:CreateQuizDto){
        return await this.quizService.createQuiz(data);
    }

    @Get()
    @ApiOperation({ summary: 'Obtiene tods los quizes guardados en base de datos.' })
    @ApiResponse({ status: 200, description: 'Quizes encontrados con exito' })
    @ApiResponse({ status: 400, description: 'Catch error msge' })
    async findAllQuizzes(){
        return await this.quizService.findAllQuizes();
    }

    @Get('findById/:id')
    @ApiOperation({ summary: 'Obtiene un quiz por ID' })
    @ApiParam({ name: 'id', description: 'ID del quiz', type: 'number' })
    @ApiResponse({ status: 200, description: 'Quiz encontrado' })
    @ApiResponse({ status: 202, description: 'No se encontro Quiz con id:  ${id}' })
    @ApiResponse({ status: 400, description: 'Catch error msge' })
    async findQuizById(@Param('id') id: number){
        return await this.quizService.findQuizById(id);
    }

    @Patch()
    @ApiBody({ type: UpdateQuiz,examples: {example1:{ 
        value: {
            "id": 13,
            "name" : "Great quiz"
        }}} })
    @ApiOperation({ summary: 'Actualiza un quiz por ID'})
    @ApiResponse({ status: 200, description: 'servicio actualizado con exito' })
    @ApiResponse({ status: 202, description: 'Ya existe el nombre "+data.name+" y no se puede usar este nombre' })
    @ApiResponse({status:400, description: 'Catch error msge'})
    async updateQuiz(@Body() data:UpdateQuiz){
        return await this.quizService.updateQuiz(data)
    }

    @Delete('/:id')
    @ApiOperation({summary: 'Elimina un quiz con sus preguntas en base de datos por ID'})
    @ApiParam({ name: 'id', description: 'ID del quiz a eliminar', type: 'number' })
    @ApiResponse({ status: 200, description: 'Quiz eliminado exitosamente' })
    @ApiResponse({ status: 202, description: 'No se encontro quiz a eliminar' })
    @ApiResponse({ status: 400, description: 'Catch error msge' })
    async deleteQuizById(@Param('id') id:number){
        return await this.quizService.deleteQuiz(id);
    }

}
