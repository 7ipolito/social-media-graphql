import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginService } from './login.service';
import { LoginInput, LoginResponse } from './dtos/login.dto';
import { User } from 'src/users/users.schema';

@Resolver(() => User)
export class LoginResolver {
  constructor(private readonly loginService: LoginService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<LoginResponse> {
    const user = await this.loginService.login(loginInput);
    return { user };
  }
}
