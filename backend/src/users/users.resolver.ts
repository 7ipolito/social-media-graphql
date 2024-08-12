import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './users.schema';
import { UserService } from './users.service';
import { LoginInput, LoginResponse } from './dtos/login.dto';
import { RegisterInput, RegisterResponse } from './dtos/register-user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<LoginResponse> {
    const user = await this.userService.login(loginInput);
    return { user };
  }

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<LoginResponse> {
    const user = await this.userService.createUser(registerInput);
    return { user };
  }
}
