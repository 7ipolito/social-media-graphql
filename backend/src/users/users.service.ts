import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}
  private readonly users: any = [{ id: 1, name: 'Cat' }];

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }
}
