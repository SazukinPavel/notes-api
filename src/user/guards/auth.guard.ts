import { UserEntity } from './../user.entity';
import { SECRET_KEY } from './../../config';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { Request } from 'src/types/Request';

@Injectable()
export class AuthGuard implements CanActivate{
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean>{
        const request=context.switchToHttp().getRequest<Request>();
        const token=request.headers.authorization
        if(token){
            const user=verify(token,SECRET_KEY) as UserEntity
            if(user){
                request['user']=user
                return true
            }
        }
        throw new UnauthorizedException()
    }

}