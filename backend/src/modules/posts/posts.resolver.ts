import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './posts.service';
import { Post } from './posts.schema';
import { CreatePostInput } from './dtos/create-post.dto';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post], { name: 'posts' }) //name set instead of getAllBooks it's now books
  findAll() {
    return this.postService.findAll();
  }
  @Mutation(() => Post)
  async createPost(@Args('createPostInput') createPostDto: CreatePostInput) {
    return this.postService.create(createPostDto);
  }
}
