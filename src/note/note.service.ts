import { GetFullNoteDto } from './dto/GetFullNote.dto';
import { UpdateNoteDTO } from './dto/UpdateNote.dto';
import { TagEntity } from './../tag/tag.entity';
import { TagService } from './../tag/tag.service';
import { UserEntity } from './../user/user.entity';
import { AddNoteDTO } from './dto/AddNote.dto';
import { NoteEntity } from 'src/note/note.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class NoteService {

    constructor(@InjectRepository(NoteEntity) private noteRepo:Repository<NoteEntity>,
    private tagService:TagService){}

    getNotes(page:number,take:number){
        return this.noteRepo.find(this.configurePaginationOptions(take,page))
    }

    private configurePaginationOptions(take:number,page:number){
        const options:FindManyOptions<NoteEntity>={}
        if(page && take){
            options.skip=page*take
            options.take=take
        }else if(take){
            options.take=take
        }
        console.log(options);
        
        return options
    }

    getNotesWithTags(page:number,take:number){
        const options=this.configurePaginationOptions(take,page)
        options.relations=['tags']
        return this.noteRepo.find(options)
    }

    getFullNotes(page:number,take:number){
        const options=this.configurePaginationOptions(take,page)
        options.relations=['tags','user']
        return this.noteRepo.find(options).then((notes)=>
        notes.map(note=>{
            delete note.user.password
            delete note.user.img
            delete note.user.role
            return note
        }))
    }

    async addNote({tags,...dto}:AddNoteDTO,user:UserEntity){
        let newTags:TagEntity[]=[]
        if(tags.length){
            newTags=await Promise.all(tags.map(async(name)=>this.tagService.findOrAddTag(name)))
        }
        const note=this.noteRepo.create({...dto,tags:newTags,user})
        return this.noteRepo.save(note)
    }

    async updateNote(dto:UpdateNoteDTO){
        const tags=await this.tagService.addTags({tags:dto.tags})
        return this.noteRepo.save({...dto,tags})
    }

    getUserNotes(userId:string,page:number,take:number){
        const options=this.configurePaginationOptions(take,page)
        options.where={user:userId}
        return this.noteRepo.find(options)
    }

    getNotesCount(){
        return this.noteRepo.count()
    }

    async deleteUserNote(noteId:string,user:UserEntity | string){
        const userNote=await this.noteRepo.findOne({where:{id:noteId,user}})
        if(!userNote){
            throw new HttpException('Вы не владеете этой записью',HttpStatus.NOT_ACCEPTABLE)
        }
        return this.noteRepo.delete(noteId)
    }
}
