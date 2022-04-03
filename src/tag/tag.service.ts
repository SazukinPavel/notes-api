import { TagEntity } from './tag.entity';
import { CreateTagDTO } from './dto/AddTag.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddTagsDTO } from './dto/AddTags.dto';

@Injectable()
export class TagService {

    constructor(@InjectRepository(TagEntity) private tagRepo:Repository<TagEntity>){}

    getAll(){
        return this.tagRepo.find()
    }

    getTagsNotes(id:string){
        return this.tagRepo.findOne({where:{id},relations:['notes']})
    }

    addTag(dto:CreateTagDTO){
        return this.tagRepo.save(dto)
    }

    private findTagByName(name:string){
        return this.tagRepo.findOne({where:{name}})
    }

    async findOrAddTag(name:string){
        const tag=await this.findTagByName(name)
        if(tag){
            return tag
        }
        return this.addTag({name})
    }

    async addTags(dto:AddTagsDTO){
        const tags=await Promise.all(dto.tags.map(async t=>{
            return await this.findOrAddTag(t)
        }))
        return tags
    }

}
