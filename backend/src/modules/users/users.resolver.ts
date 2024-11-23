import { Resolver, Query, Context } from '@nestjs/graphql';
import { ClerkGuard } from './guards/clerk.guard';
import { User } from './users.schema';
import { UserService } from './users.service';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Query(() => User)
  @UseGuards(ClerkGuard)
  async whoami(@Context() context: any): Promise<User> {
    const userId = context.userId;

    if (!userId) {
      throw new Error('User ID not found in context');
    }

    const user = await this.usersService.getUser(userId);

    if (!user) {
      console.log(userId);
      throw new Error('User not found');
    }

    return user;
  }
}
