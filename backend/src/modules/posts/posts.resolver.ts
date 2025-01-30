import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PostService } from './posts.service';
import { Post } from './schemas/posts.schema';
import { CreatePostInput } from './dtos/create-post.dto';
import { LikePostInput } from './dtos/like-post.dto';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { AddCommentInput } from './dtos/add-comment-input.dto';

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
    console.log('Post AtualizadoOIII:', updatedPost);
    this.pubSub.publish('commentAdded', { commentAdded: updatedPost });
    console.log('Comentário publicado para a subscription');

    return updatedPost;
  }

  @Subscription(() => Post, {
    filter: (payload, variables) => {
      console.log('Payload:', payload);
      console.log('Variables:', variables);
      return payload.commentAdded._id.toString() == variables.postId;
    },
    resolve: (payload) => {
      console.log('Resolved Payload:', payload);
      return payload.commentAdded;
    },
  })
  commentAdded(@Args('postId') postId: string) {
    console.log('Subscription chamada com postId:', postId);
    return this.pubSub.asyncIterableIterator('commentAdded');
  }
}
