import { Resolver, Query, Context } from '@nestjs/graphql';
import { User } from './users.schema';
import { UserService } from './users.service';
import { GraphQLContext } from '../login/login.resolver';
import { IError } from '../login/login.service';
import { UsersResponse } from './dtos/get-whoami.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  private isAuthenticated(session: any): boolean {
    return session.userId !== undefined;
  }

  @Query(() => UsersResponse)
  whoami(@Context() context: GraphQLContext): UsersResponse {
    console.log(context.req.session);
    if (!this.isAuthenticated(context.req.session)) {
      const error: IError[] = [
        {
          path: 'users',
          message: 'User not authenticated',
        },
      ];
      return { error };
    }
    return { userId: context.req.session.userId };
  }
}
