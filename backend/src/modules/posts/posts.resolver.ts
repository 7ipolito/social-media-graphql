import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PostService } from './posts.service';
import { Post } from './schemas/posts.schema';
import { CreatePostInput } from './dtos/create-post.dto';
import { LikePostInput } from './dtos/like-post.dto';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { AddCommentInput } from './dtos/add-comment-input.dto';
import { Comment } from './schemas/comments.schema';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postService.findAll();
  }

  @Query(() => [Comment])
  async getAllComments(@Args('postId') postId: string) {
    return this.postService.findAllComments(postId);
  }

  @Mutation(() => Post)
  async createPost(@Args('createPostInput') createPostDto: CreatePostInput) {
    return this.postService.create(createPostDto);
  }

  @Mutation(() => Post)
  async likePost(@Args('likePostInput') likePostDto: LikePostInput) {
    return this.postService.likePost(likePostDto);
  }

  @Mutation(() => Post)
  async addComment(@Args('addCommentInput') addCommentDto: AddCommentInput) {
    const updatedPost = await this.postService.addComment(addCommentDto);

    this.pubSub.publish('commentAdded', {
      commentAdded: {
        postId: addCommentDto.postId,
        comments: updatedPost,
      },
    });

    return updatedPost;
  }

  @Subscription(() => Post, {
    filter: (payload, variables) => {
      return payload.commentAdded.postId === variables.postId;
    },
    resolve: (payload) => {
      console.log(payload.commentAdded.postId);
      console.log('Resolved Payload:', payload.commentAdded.comments);
      return payload.commentAdded.comments.populate('comments.user');
    },
  })
  commentAdded(@Args('postId') postId: string) {
    console.log('Subscription chamada com postId:', postId);
    return this.pubSub.asyncIterableIterator('commentAdded');
  }
}
