import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginService } from './login.service';
import { LoginInput, LoginResponse } from './dtos/login.dto';
import { User } from 'src/modules/users/users.schema';
import { GraphQLExecutionContext } from '@nestjs/graphql';

export type IRequest = Request & {
  session: any;
};

export type GraphQLContext = GraphQLExecutionContext & {
  req: IRequest;
  res: Response;
  redis: any;
};

@Resolver(() => User)
export class LoginResolver {
  constructor(private readonly loginService: LoginService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context: GraphQLContext, // Use o decorador @Context para obter o contexto
  ): Promise<LoginResponse> {
    console.log('Context:', context.req.session);

    const error = await this.loginService.login(
      loginInput,
      context.req.session,
      context.redis,
      context.req,
    );
    return { error };
  }
}
