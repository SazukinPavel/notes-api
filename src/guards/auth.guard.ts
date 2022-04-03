import { UserEntity } from '../user/user.entity';
import { SECRET_KEY } from '../config';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { Request } from 'src/types/Request';

@Injectable()
export class AuthGuard implements CanActivate{
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean>{
        const request=context.switchToHttp().getRequest<Request>();
        if(request.user){
            return true
        }
        throw new UnauthorizedException()
    }

}