import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/modules/users/entities/user.entity';
import { LoginResolver } from './login.resolver';
import { LoginService } from './login.service';
import { RedisModule } from 'nestjs-redis'; // Importe o RedisModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RedisModule,
  ],

  providers: [LoginResolver, LoginService],
})
export class LoginModule {}
