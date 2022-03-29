import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterUserDto{

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @MinLength(8)
    password:string

    @IsNotEmpty()
    username:string

    bio:string

    img:string

}