import { AuthGuard } from './guards/auth.guard';
import { UserEntity } from './user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService,AuthGuard],
  imports:[TypeOrmModule.forFeature([UserEntity])]
})
export class UserModule {}
