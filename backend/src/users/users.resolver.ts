import { Query, Resolver } from '@nestjs/graphql';
import { User } from './users.schema';
import { UserService } from './users.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' }) //name set instead of getAllBooks it's now books
  findAll() {
    return this.userService.findAll();
  }
}
