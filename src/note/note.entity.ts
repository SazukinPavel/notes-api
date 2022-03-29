import { TagEntity } from './../tag/tag.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { UserEntity } from './../user/user.entity';


@Entity('notes')
export class NoteEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    title:string

    @Column()
    description:string

    @ManyToMany(()=>TagEntity,(tag)=>tag.notes)
    @JoinTable()
    tags:TagEntity[]

    @ManyToOne(()=>UserEntity,user=>user.notes,{onDelete:'CASCADE'})
    user:UserEntity
}