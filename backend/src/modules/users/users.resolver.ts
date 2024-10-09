import { Resolver, Query } from '@nestjs/graphql';
import { User } from './users.schema';
import { UserService } from './users.service';

import { UsersResponse } from './dtos/get-whoami.dto';
import { Req, UseGuards } from '@nestjs/common';
import { ClerkGuard } from './guards/clerk.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UsersResponse)
  @UseGuards(ClerkGuard)
  whoami(@Req() request: Request): UsersResponse {
    const userId = request['userId'];

    return { userId };
  }
}
