import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/modules/users/users.schema';
import { RegisterInput, RegisterResponse } from './dtos/register-user.dto';
import { RegisterService } from './register.service';

@Resolver(() => User)
export class RegisterResolver {
  constructor(private readonly registerService: RegisterService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<RegisterResponse> {
    const error = await this.registerService.createUser(registerInput);

    return { error };
  }
}
