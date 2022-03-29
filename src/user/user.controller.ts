import { UserService } from './user.service';
import { RegisterUserDto } from './dto/RegisterUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';
import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';

@Controller('users')
export class UserController {

    constructor(private userService:UserService){}

    @Post('login')
    @UsePipes(new ValidationPipe())
    login(@Body() dto:LoginUserDto){
        return this.userService.login(dto)
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    register(@Body() dto:RegisterUserDto){
        return this.userService.register(dto)
    }

    @Get()
    @UseGuards(AuthGuard)
    get(){
        
    }
}
