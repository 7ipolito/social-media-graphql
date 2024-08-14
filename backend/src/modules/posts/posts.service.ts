import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './posts.schema';
import { PostDocument } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
  ) {}
  // private readonly users: any = [{ id: 1, name: 'Cat' }];

  async findAll(): Promise<Post[]> {
    return await this.postModel.find();
  }
}
