import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { ErrorType } from 'src/modules/register/dtos/register-user.dto';

@InputType()
export class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
export class LoginResponse {
  @Field(() => [ErrorType], { nullable: true })
  error?: ErrorType[];
}
