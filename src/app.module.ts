import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { NoteModule } from './note/note.module';
import { AuthMiddleWare } from './middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(),UserModule, NoteModule, TagModule],
})
export class AppModule implements NestModule{
  
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleWare)
      .forRoutes('users','notes','tags');
  }
}
