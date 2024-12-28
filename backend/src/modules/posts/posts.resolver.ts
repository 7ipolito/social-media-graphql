import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './posts.service';
import { Post } from './posts.schema';
import { CreatePostInput } from './dtos/create-post.dto';
import { LikePostInput } from './dtos/like-post.dto';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

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
}
