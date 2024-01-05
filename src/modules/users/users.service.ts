import { Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ) {}

    async createUser(data:any){
        try {
            const existUser = await this.usersRepository.find({ where: { email: data.email } });
            if (existUser.length == 0) {
                await this.usersRepository.save({
                    name: data.name,
                    email: data.email
                })
                return{
                    status:true,
                    msge: "Usuario creado con exito"
                }                 
            } else {
                return{
                    status: false,
                    msge: "Ya existe el email: "+data.email+" registrado"
                }
            }

        } catch (error) {
            return({
                status: false,
                msge: error.message
            })
        }
    }

    async findAllUsers(){
        try {
            const allUsers = await this.usersRepository.find();
            return{
                status: true,
                msge: "Usuarios encontrados correctamente",
                data: allUsers
            }
        } catch (error) {
            return{
                status:false,
                error: error.message
            }
        }
    }

    async findUserById(id:number){
        try {
            const user = await this.usersRepository.findBy({id:id});
            if (user.length > 0) {
                return{
                    status: true,
                    msge: "Usuario encontrado con exito",
                    data: user
                }
            } else {
                return{
                    status: false,
                    msge: "No existe usuario con id "+id
                }
            }
        } catch (error) {
            return{
                status: false,
                msge: error.message
            }
        }
    }

    async updateUser(data:any){
        try {
            const existUser = await this.usersRepository.find({where: {email:data.email}});
            if (existUser.length == 0) {
                await this.usersRepository.update(data.id,data);
                return{
                    status:true,
                    msge: "Usuario actualizado correctamente",
                }
            } else {
                return{
                    status: false,
                    msge: "Ya existe el email: "+data.email+" registrado"
                }
            }
        } catch (error) {
            return {
                status: false,
                msge: error.message
            }
        }
    }

    async deleteUser(id:number){
        try {
            const userToDelete = await this.usersRepository.findBy({id:id})
            if (userToDelete.length > 0) {
                await this.usersRepository.remove(userToDelete);
                return{
                    status: true,
                    msge: "Usuario eliminado correctamente"
                }
            } else {
                return{
                    status: false,
                    msge: "NO existe usuario con id: "+id
                }
            }
        } catch (error) {
            return{
                status: false,
                msge: error.message
            }
        }
    }
}
