import { Resolver, Query, Context, Mutation, Args } from '@nestjs/graphql';
import { ClerkGuard } from './guards/clerk.guard';
import { User } from './users.schema';
import { UserService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { DeleteInput, DeleteResponse } from './dtos/delete-user.dto';
import { WhoamiInput } from './dtos/whoami.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Query(() => User)
  async whoami(@Args('whoamiInput') whoamiInput: WhoamiInput): Promise<User> {
    const userId = whoamiInput.userId;

    if (!userId) {
      throw new Error('User ID not found in context');
    }

    const user = await this.usersService.getUser(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  // @Mutation(() => DeleteResponse)
  // async register(
  //   @Args('registerInput') registerInput: DeleteInput,
  // ): Promise<RegisterResponse> {
  //   const error = await this.usersService.deleteUser(registerInput.id);
  //   return { error };
  // }

  @Mutation(() => DeleteResponse)
  async deleteUser(
    @Args('deleteInput') deleteInput: DeleteInput,
  ): Promise<DeleteResponse> {
    console.log(deleteInput);
    const error = await this.usersService.deleteUser(deleteInput);
    return { error };
  }
}
