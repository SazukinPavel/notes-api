import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [TypeOrmModule.forRoot(),UserModule, NoteModule, TagModule],
})
export class AppModule {}
