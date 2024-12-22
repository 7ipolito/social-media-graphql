import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './entities/post.entity';
import { User, UserDocument } from 'src/modules/users/entities/user.entity';
import { CreatePostInput } from './dtos/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createPostDto: CreatePostInput): Promise<Post> {
    const { clerkUserId, body } = createPostDto;

    const user = await this.userModel.findOne({ clerkUserId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const createdPost = this.postModel.create({
      body,
      user: user._id,
    });

    return createdPost;
  }

  async findAll(): Promise<Post[]> {
    return await this.postModel.find();
  }
}
