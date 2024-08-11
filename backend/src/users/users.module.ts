import { Module } from '@nestjs/common';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';

@Module({
  imports: [],
  providers: [UserResolver, UserService],
})
export class UsersModule {}
