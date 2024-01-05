import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor (private readonly usersService : UsersService){}

    @Post()
    async createUser(@Body() data:any){
        return await this.usersService.createUser(data);
    }

    @Get()
    async findAllUsers(){
        return await this.usersService.findAllUsers();
    }

    @Get('/:id')
    async findUserById(@Param('id') id:number){
        return await this.usersService.findUserById(id);
    }

    @Patch()
    async updateUser(@Body() data:any){
        return await this.usersService.updateUser(data)
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id:number){
        return await this.usersService.deleteUser(id)
    }
}
