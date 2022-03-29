import { TagEntity } from './tag.entity';
import { CreateTagDTO } from './dto/CreateTag.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {

    constructor(@InjectRepository(TagEntity) private tagRepo:Repository<TagEntity>){}

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
}
