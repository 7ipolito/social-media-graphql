import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { User } from '../users.schema';

@InputType()
export class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user: User;
}
