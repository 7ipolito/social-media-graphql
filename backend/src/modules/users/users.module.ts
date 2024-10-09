import { Module } from '@nestjs/common';
import { UserResolver } from './users.resolver';
import { UserService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],

  providers: [UserResolver, UserService, JwtService],
})
export class UsersModule {}
