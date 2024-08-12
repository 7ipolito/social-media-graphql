import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { LoginInput, LoginResponse } from './dtos/login.dto';
import { RegisterInput } from './dtos/register-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async verifyEmailExists(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async verifyUsernameExists(username: string): Promise<User> {
    return await this.userModel.findOne({ username });
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username });
    console.log(password);
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(loginInput: LoginInput): Promise<User> {
    const { username, password } = loginInput;
    const user = await this.validateUser(username, password);
    console.log(user);
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }
    return user;
  }

  async createUser(data: RegisterInput): Promise<User> {
    const { email, confirmPassword, password, username } = data;

    if (!this.verifyEmailExists) {
      throw new Error('Email already registered.');
    }

    if (!this.verifyUsernameExists) {
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
