import { LoginUserDto } from './dto/LoginUser.dto';
import { RegisterUserDto } from './dto/RegisterUser.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import {} from 'jsonwebtoken'
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { SECRET_KEY } from 'src/config';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private userRepo:Repository<UserEntity>){}

    private createUser(user:UserEntity){
        return this.userRepo.save(user)
    }

    async register(dto:RegisterUserDto){
        await this.checkFreeNameAndEmail(dto.username,dto.email)
        const user=this.userRepo.create({...dto})
        const createdUser=await this.createUser(user)
        return {token:this.generateToken(createdUser)}
    }

    async login(dto:LoginUserDto){
        const [userByName,userByEmail]=await this.findUserByNameAndEmail(dto.nameOrEmail,dto.nameOrEmail)
        if(!userByEmail && !userByName){
            throw new HttpException('Такого пользователя нет',HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const user=userByEmail || userByName
        const isPasswordEquail=await compare(dto.password,user.password)
        if(!isPasswordEquail){
            throw new HttpException('Не правильный пароль',HttpStatus.UNPROCESSABLE_ENTITY)
        }
        return {token:this.generateToken(user)}
    }

    private async checkFreeNameAndEmail(name:string,email:string){
        const [userByName,userByEmail]=await this.findUserByNameAndEmail(name,email) 
        if(userByName || userByEmail){
            throw new HttpException(userByName?'Имя пользователя уже занято':'Почта уже занята',
            HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }

    deleteUser(id:string){
        return this.userRepo.delete(id)
    }

    private findUserByNameAndEmail(name:string,email:string){
        return Promise.all([this.findUserByName(name),this.findUserByEmail(email)])
    }

    private findUserByName(name:string){
        return this.userRepo.findOne({where:{username:name}})
    }

    private findUserByEmail(email:string){
        return this.userRepo.findOne({where:{email}})
    }

    private generateToken(user:UserEntity){
        return sign(
            {id:user.id,username:user.username,email:user.email},SECRET_KEY
        )
    }

}
