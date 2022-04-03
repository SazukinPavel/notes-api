import { TagService } from './tag.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('tags')
export class TagController {

    constructor(private tagService:TagService){}

    @Get()
    getAllTags(){
        return this.tagService.getAll()
    }

    @Get(':id')
    getTagNotes(@Param('id') id:string){
        return this.tagService.getTagsNotes(id)
    }
    
}
