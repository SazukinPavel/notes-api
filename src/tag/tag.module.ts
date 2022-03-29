import { TagEntity } from './tag.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from 'src/note/note.entity';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  controllers: [TagController],
  providers: [TagService],
  imports:[TypeOrmModule.forFeature([TagEntity])],
  exports:[TagService]
})
export class TagModule {}
