import { UserEntity } from './../user/user.entity';
import { SECRET_KEY } from 'src/config';
import { verify } from 'jsonwebtoken';
import { UserService } from './../user/user.service';
import { Injectable, NestMiddleware } from "@nestjs/common";
import {Request} from '../types/Request'
import { NextFunction } from 'express';

@Injectable()
export class AuthMiddleWare implements NestMiddleware{

    constructor(private userService:UserService){}

    async use(req: Request, res: any, next:NextFunction){
        const token=req.headers['authorization']
        if(token){
            const jwtUser=verify(token,SECRET_KEY) as UserEntity
            if(!jwtUser){
                next()
                return
            }
            const user=await this.userService.findUserByIdNameEmail(jwtUser.id,jwtUser.username,jwtUser.email)
            if(!user){
                next();
                return
            }
            delete user.password   
            req.user=user
        }
        next()
    }

} 