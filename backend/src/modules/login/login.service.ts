import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginInput } from './dtos/login.dto';
import * as bcrypt from 'bcryptjs';
import { UserDocument } from 'src/modules/users/entities/user.entity';
import { User } from 'src/modules/users/users.schema';
import { Session } from 'express-session';
import { userSessionIdPrefix } from 'src/utils/constants';

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

  async login(
    loginInput: LoginInput,
    session: Session,
    redis: any,
    req: any,
  ): Promise<null | IError[]> {
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
    session.userId = String(user._id);

    await new Promise((resolve, reject) => {
      session.save((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(null);
        }
      });
    });

    if (req.sessionID) {
      await redis.lpush(`${userSessionIdPrefix}${user._id}`, req.sessionID);
    }
    return null;
  }
}
