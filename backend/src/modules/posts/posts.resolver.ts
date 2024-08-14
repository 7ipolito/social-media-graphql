import { Query, Resolver } from '@nestjs/graphql';
import { PostService } from './posts.service';
import { Post } from './posts.schema';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post], { name: 'posts' }) //name set instead of getAllBooks it's now books
  findAll() {
    return this.postService.findAll();
  }
}
