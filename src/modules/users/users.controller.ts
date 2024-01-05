import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor (private readonly usersService : UsersService){}

    @Post()
    async createUser(@Body() data:any){
        return this.usersService.createUser(data);
    }

    @Get()
    async findAllUsers(){
        return this.usersService.findAllUsers();
    }

    @Get('/:id')
    async findUserById(@Param('id') id:number){
        return this.usersService.findUserById(id);
    }
}
