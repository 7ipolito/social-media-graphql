import { Resolver } from '@nestjs/graphql';
import { User } from './users.schema';
import { UserService } from './users.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
}
