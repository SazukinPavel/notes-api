import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean>{
        const request=context.switchToHttp().getRequest<Request>();
        const token=request.headers.get('authorization')
        console.log(token);
        return true
    }

}