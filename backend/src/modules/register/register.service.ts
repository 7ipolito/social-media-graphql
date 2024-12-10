import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/modules/users/entities/user.entity';
import { User } from 'src/modules/users/users.schema';
import { RegisterInput } from './dtos/register-user.dto';
import * as yup from 'yup';
import { duplicate, emailNotLongEnough, invalidEmail } from './errorMessages';
import { formatYupError } from 'src/utils/formatYupError';
import { IError } from 'src/types/IError';

const schema = yup.object().shape({
  clerkUserId: yup.string(),
  email: yup.string().min(3, emailNotLongEnough).max(255).email(invalidEmail),
  username: yup.string().min(3, emailNotLongEnough).max(20),
  image: yup.string(),
});

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async verifyEmailExists(email: string): Promise<boolean> {
    return (await this.userModel.findOne({ email })) !== null ? true : false;
  }

  async verifyUsernameExists(username: string): Promise<boolean> {
    return (await this.userModel.findOne({ username })) !== null ? true : false;
  }

  async createUser(data: RegisterInput): Promise<IError[] | null> {
    const { email, clerkUserId, image, username } = data;
    try {
      await schema.validate(data, { abortEarly: false });
    } catch (err: any) {
      return formatYupError(err);
    }

    if (await this.verifyEmailExists(email)) {
      return [
        {
          path: 'email',
          message: duplicate,
        },
      ];
    }

    if (await this.verifyUsernameExists(username)) {
      return [
        {
          path: 'username',
          message: duplicate,
        },
      ];
    }

    console.log(
      await this.userModel.create({
        email,
        clerkUserId,
        image,
        username,
      }),
    );

    await this.userModel.create({
      email,
      clerkUserId,
      image,
      username,
    });

    return null;
  }
}
