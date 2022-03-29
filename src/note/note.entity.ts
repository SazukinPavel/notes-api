import { TagEntity } from './../tag/tag.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { UserEntity } from './../user/user.entity';


@Entity()
export class NoteEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    title:string

    @Column()
    description:string

    @ManyToMany(()=>TagEntity,(tag)=>tag.notes)
    tags:TagEntity[]

    @ManyToOne(()=>UserEntity,user=>user.notes)
    user:UserEntity
}