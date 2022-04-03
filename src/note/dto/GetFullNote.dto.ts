import { UserInfo } from './../../types/UserInfo';
import { TagEntity } from './../../tag/tag.entity';

export interface GetFullNoteDto{
    title:string
    description:string
    tags:TagEntity[]
    id:string
    user:UserInfo
}