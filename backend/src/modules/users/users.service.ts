import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { IError } from 'src/types/IError';
import { DeleteInput } from './dtos/delete-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async getUser(userId: string): Promise<User> {
    return await this.userModel.findOne({ clerkUserId: userId });
  }

  async deleteUser(data: DeleteInput): Promise<IError[] | null> {
    const { id } = data;
    const response = await this.userModel.findOneAndDelete({
      clerkUserId: id,
    });

    if (response) {
      return null;
    } else {
      return [
        {
          path: 'user',
          message: 'Error at delete',
        },
      ];
    }
  }
}
