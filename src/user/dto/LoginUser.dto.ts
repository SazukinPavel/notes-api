import { IsNotEmpty } from "class-validator"

export class LoginUserDto{

    @IsNotEmpty()
    nameOrEmail:string
    
    @IsNotEmpty()
    password:string
}