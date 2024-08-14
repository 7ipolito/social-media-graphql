import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/modules/users/entities/user.entity';
import { RegisterService } from './register.service';
import { RegisterResolver } from './register.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],

  providers: [RegisterService, RegisterResolver],
})
export class RegisterModule {}
