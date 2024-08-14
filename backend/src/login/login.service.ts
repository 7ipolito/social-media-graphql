import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginInput } from './dtos/login.dto';
import * as bcrypt from 'bcryptjs';
import { UserDocument } from 'src/users/entities/user.entity';
import { User } from 'src/users/users.schema';

export interface IError {
  path: string;
  message: string;
}

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      return null;
    }
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(loginInput: LoginInput): Promise<null | IError[]> {
    const { username, password } = loginInput;
    const user = await this.validateUser(username, password);
    if (!user) {
      return [
        {
          path: 'login',
          message: 'Invalid credentials',
        },
      ];
    }
    return null;
  }
}
