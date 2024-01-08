import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsers, UpdateUser } from './dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor (private readonly usersService : UsersService){}

    @Post()
    @ApiBody({ type: CreateUsers, examples: {example1:
        { value: 
            {
                name: "Pepito",
                email: "pepito@gmail.com"
            }
        }} })
    @ApiOperation({ summary: 'Crea un nuevo usuario en bases de datos' })
    @ApiResponse({ status: 200, description: 'Usuario creado con exito'})
    @ApiResponse({ status: 202, description: 'Ya existe el email: ${data.email} registrado'})
    @ApiResponse({ status: 400, description: 'Catch error msge'})
    async createUser(@Body() data:CreateUsers){
        return await this.usersService.createUser(data);
    }

    @Get()
    @ApiOperation({ summary: 'Obtiene todos las usuarios registrados' })
    @ApiResponse({ status: 200, description: 'Usuarios encontrados correctamente' })
    @ApiResponse({ status: 400, description: 'Catch error msge' })
    async findAllUsers(){
        return await this.usersService.findAllUsers();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Obtiene una respuesta por ID' })
    @ApiParam({ name: 'id', description: 'ID del usuario', type: 'number' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado con exito' })
    @ApiResponse({ status: 202, description: 'No existe usuario con id ${id}' })
    @ApiResponse({ status: 400, description: 'Catch error msge' })
    async findUserById(@Param('id') id:number){
        return await this.usersService.findUserById(id);
    }

    @Patch()
    @ApiBody({ type: UpdateUser,examples: {example1:{
    value: {
        "id": 3,
        "name": "Theodoro",
        "email": "theodoro@gmail.com"
    }}} })
    @ApiOperation({ summary: 'Actualiza una usuario registrado por ID'})
    @ApiResponse({ status: 200, description: 'Usuario actualizado correctamente' })
    @ApiResponse({ status: 202, description: 'Ya existe el email: ${data.email} registrado' })
    @ApiResponse({status:400, description: 'Catch error msge'})
    async updateUser(@Body() data:UpdateUser){
        return await this.usersService.updateUser(data)
    }

    @Delete('/:id')
    @ApiOperation({summary: 'Elimina una usuario y sus respuestas en base de datos por ID'})
    @ApiParam({ name: 'id', description: 'ID del usuario', type: 'number' })
    @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente' })
    @ApiResponse({ status: 202, description: 'No existe usuario con id: ${id}' })
    @ApiResponse({ status: 400, description: 'No se encontro repuesta registrada con id: ${id}' })
    async deleteUser(@Param('id') id:number){
        return await this.usersService.deleteUser(id)
    }
}
