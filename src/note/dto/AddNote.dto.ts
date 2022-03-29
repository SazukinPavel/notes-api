import { IsNotEmpty } from "class-validator";


export class AddNoteDTO{

    @IsNotEmpty()
    title:string

    @IsNotEmpty()
    description:string

    tags:string[]
}