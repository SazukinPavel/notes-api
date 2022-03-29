import { NoteEntity } from "src/note/note.entity"
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class TagEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({unique:true})
    name:string

    @Column()
    count:number

    @ManyToMany(()=>NoteEntity,note=>note.tags)
    notes:NoteEntity[]
}