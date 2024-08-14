import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/modules/users/entities/user.entity';
import { User } from 'src/modules/users/users.schema';
import { RegisterInput } from './dtos/register-user.dto';
import * as yup from 'yup';
import {
  duplicate,
  emailNotLongEnough,
  invalidEmail,
  invalidUsername,
  passwordNotLongEnough,
} from './errorMessages';
import { formatYupError } from 'src/utils/formatYupError';

const schema = yup.object().shape({
  username: yup.string().min(3, emailNotLongEnough).max(255),
  email: yup.string().min(3, emailNotLongEnough).max(255).email(invalidEmail),
  password: yup.string().min(3, passwordNotLongEnough).max(255),
  confirmPassword: yup.string().min(3, passwordNotLongEnough).max(255),
});

export interface IError {
  path: string;
  message: string;
}

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async verifyEmailExists(email: string): Promise<boolean> {
    return (await this.userModel.findOne({ email })) ? true : false;
  }

  async verifyUsernameExists(username: string): Promise<boolean> {
    return (await this.userModel.findOne({ username })) ? true : false;
  }

  async createUser(data: RegisterInput): Promise<IError[] | null> {
    const { email, confirmPassword, password, username } = data;
    try {
      await schema.validate(data, { abortEarly: false });
    } catch (err: any) {
      return formatYupError(err);
    }
    if (this.verifyEmailExists(email)) {
      return [
        {
          path: 'email',
          message: duplicate,
        },
      ];
    }

    if (this.verifyUsernameExists(username)) {
      return [
        {
          path: 'username',
          message: invalidUsername,
        },
      ];
    }

    if (password !== confirmPassword) {
      return [
        {
          path: 'password',
          message: password,
        },
      ];
    }

    await this.userModel.create({
      email,
      password,
      username,
    });

    return null;
  }
}
