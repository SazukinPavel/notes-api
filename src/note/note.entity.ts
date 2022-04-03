import { TagEntity } from './../tag/tag.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { UserEntity } from './../user/user.entity';


@Entity('notes')
export class NoteEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    title:string

    @Column()
    description:string

    @ManyToMany(()=>TagEntity,(tag)=>tag.notes,{cascade:true})
    @JoinTable()
    tags:TagEntity[]

    @ManyToOne(()=>UserEntity,user=>user.notes)
    @JoinColumn()
    user:UserEntity
}