import { Context, Mutation, Resolver } from '@nestjs/graphql';

import { User } from 'src/modules/users/users.schema';
import { removeAllUsersSessions } from 'src/utils/removeAllUsersSessions';
import { GraphQLContext } from '../login/login.resolver';

@Resolver(() => User)
export class LogoutResolver {
  constructor() {}

  @Mutation(() => Boolean)
  async logout(
    _,
    @Context() context: GraphQLContext, // Use o decorador @Context para obter o contexto
  ): Promise<boolean> {
    const { req, redis } = context;
    console.log(req.session);
    if (req.session.userId) {
      removeAllUsersSessions(req.session.userId, redis);
      return true;
    }

    return false;
  }
}
