import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './entities/post.entity';
import { User, UserDocument } from 'src/modules/users/entities/user.entity';
import { CreatePostInput } from './dtos/create-post.dto';
import { LikePostInput } from './dtos/like-post.dto';
import { PubSub } from 'graphql-subscriptions';
import { AddCommentInput } from './dtos/add-comment-input.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  async create(createPostDto: CreatePostInput): Promise<Post> {
    const { clerkUserId, body } = createPostDto;

    const user = await this.userModel.findOne({ clerkUserId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const createdPost = await this.postModel.create({
      body,
      user: user._id,
    });

    return this.postModel.findById(createdPost._id).populate('user');
  }

  async findAll(): Promise<Post[]> {
    return await this.postModel.find().populate('user').populate('likes');
  }

  async likePost(likePost: LikePostInput): Promise<Post> {
    const post = await this.postModel.findById(likePost.postId);
    if (!post) {
      throw new Error('Post não encontrado');
    }

    const user = await this.userModel.findOne({
      clerkUserId: likePost.userId,
    });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const hasLiked = post.likes.some((like) => {
      like == user._id;
    });
    if (hasLiked) {
      throw new Error('Você já curtiu este post.');
    }

    post.likes.push(user._id);
    post.countLikes += 1;

    await post.save();

    return this.postModel.findById(post._id).populate('likes');
  }

  async addComment(addCommentInput: AddCommentInput): Promise<Post> {
    const post = await this.postModel.findById(addCommentInput.postId);
    if (!post) {
      throw new Error('Post not found');
    }

    const user = await this.userModel.findOne({
      clerkUserId: addCommentInput.userId,
    });

    post.comments.push({
      user: user._id,
      text: addCommentInput.text,
      createdAt: new Date(),
    });

    const updatedPost = await post.save();

    await this.pubSub.publish('commentAdded', { commentAdded: updatedPost });

    return updatedPost;
  }
}
