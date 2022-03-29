import { UserEntity } from './../user/user.entity';
import { AddNoteDTO } from './dto/AddNote.dto';
import { NoteService } from './note.service';
import { Body, Controller, Delete, Get, Param, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { userInfo } from 'os';

@Controller('note')
export class NoteController {

    constructor(private noteService:NoteService){}

    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    addNote(@Body() dto:AddNoteDTO,@User() user){
        return this.noteService.addNote(dto,user)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteNote(@Param('id') id:string,@User() user:UserEntity){
        
    }

    @Get()
    @UseGuards(AuthGuard)
    getNotes(@User() user:UserEntity){
        return this.noteService.getUserNotes(user.id)
    }
}
