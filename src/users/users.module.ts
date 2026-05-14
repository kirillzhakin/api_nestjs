import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { DbModule } from '../database';

@Module({
    imports: [DbModule],
    providers: [UsersRepository],
    exports: [UsersRepository],
})
export class UsersModule { }