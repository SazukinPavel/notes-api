import { hash } from "bcryptjs";
import { NoteEntity } from "src/note/note.entity";
import { BeforeInsert, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class UserEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({unique:true})
    username:string

    @Column({unique:true})
    email:string

    @Column()
    password:string

    @Column({default:''})
    bio:string

    @Column({nullable:true})
    img:string

    @OneToMany(()=>NoteEntity,note=>note.user,{cascade:true})
    @JoinColumn()
    notes:NoteEntity[]

    @BeforeInsert()
    async hashPassword(){
        this.password=await hash(this.password,10)
    }
}