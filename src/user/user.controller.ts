import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/RegisterUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';
import { Body, Controller, Delete, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { User } from 'src/decorators/user.decorator';

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
    get(@User() user){
        console.log(user as UserEntity);
        
    }

    @Delete()
    @UseGuards(AuthGuard)
    deleteUser(@User() user:UserEntity){
        return this.userService.deleteUser(user.id)
    }
}
