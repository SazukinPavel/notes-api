import { UpdateNoteDTO } from './dto/UpdateNote.dto';
import { UserEntity } from './../user/user.entity';
import { AddNoteDTO } from './dto/AddNote.dto';
import { NoteService } from './note.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('notes')
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
        return this.noteService.deleteUserNote(id,user)
    }

    @Get('/user')
    @UseGuards(AuthGuard)
    getNotes(@User() user:UserEntity,@Query('take') take:number,@Query('page') page:number){
        return this.noteService.getUserNotes(user.id,page,take)
    }

    @Get()
    getAllNotes(@Query('all') all:boolean,@Query('tags') tags:boolean,@Query('full') full:boolean,@Query('take') take:number,@Query('page') page:number){
        if(all){
            return this.noteService.getNotesCount()
        }
        if(full){
            return this.noteService.getFullNotes(page,take)
        }
        if(tags){
            return this.noteService.getNotesWithTags(page,take)
        }
        return this.noteService.getNotes(page,take)
    }

    @Put()
    updateNote(@Body() dto:UpdateNoteDTO){
        return this.noteService.updateNote(dto)
    }
    
}
