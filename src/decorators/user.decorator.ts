import { UserEntity } from './../user/user.entity';
import { createParamDecorator, ExecutionContext} from '@nestjs/common';
import { Request } from 'src/types/Request';


export const User=createParamDecorator((data:string,ctx:ExecutionContext):UserEntity | null=>{
    const request = ctx.switchToHttp().getRequest<Request>()
    if(request.user){
        return data?request.user[data]:request.user
    }
    return null
})