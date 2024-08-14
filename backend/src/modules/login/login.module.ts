import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/modules/users/entities/user.entity';
import { LoginResolver } from './login.resolver';
import { LoginService } from './login.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],

  providers: [LoginResolver, LoginService],
})
export class LoginModule {}
