import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { User } from 'src/users/users.schema';
import { RegisterInput } from './dtos/register-user.dto';

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

  async createUser(data: RegisterInput): Promise<User> {
    const { email, confirmPassword, password, username } = data;

    if (this.verifyEmailExists(email)) {
      throw new Error('Email already registered.');
    }

    if (this.verifyUsernameExists(username)) {
      throw new Error('Username already registered.');
    }

    if (password !== confirmPassword) {
      throw new Error('The passwords are not the same.');
    }

    const userCreated = await this.userModel.create({
      email,
      password,
      username,
    });

    return userCreated;
  }
}
