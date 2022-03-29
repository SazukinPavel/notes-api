import { UserEntity } from './../user/user.entity';
import { Request as Req } from 'express';

export interface Request extends Req{
    user:UserEntity | null
}