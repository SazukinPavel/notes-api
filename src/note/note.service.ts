import { TagEntity } from './../tag/tag.entity';
import { TagService } from './../tag/tag.service';
import { UserEntity } from './../user/user.entity';
import { AddNoteDTO } from './dto/AddNote.dto';
import { NoteEntity } from 'src/note/note.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NoteService {

    constructor(@InjectRepository(NoteEntity) private noteRepo:Repository<NoteEntity>,
    private tagService:TagService){}

    async addNote({tags,...dto}:AddNoteDTO,user:UserEntity){
        let newTags:TagEntity[]=[]
        if(tags.length){
            newTags=await Promise.all(tags.map(async(name)=>this.tagService.findOrAddTag(name)))
        }
        const note=this.noteRepo.create({...dto,tags:newTags,user})
        return this.noteRepo.save(note)
    }

    getUserNotes(userId:string){
        return this.noteRepo.find({where:{user:userId}})
    }
}
