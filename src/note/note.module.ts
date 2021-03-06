import { TagModule } from './../tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { NoteEntity } from './note.entity';

@Module({
  controllers: [NoteController],
  providers: [NoteService],
  imports:[TypeOrmModule.forFeature([NoteEntity]),TagModule]
})
export class NoteModule {}
