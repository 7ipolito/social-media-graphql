import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/users.schema';

@InputType()
export class RegisterInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  confirmPassword: string;

  @Field()
  email: string;
}

@ObjectType()
export class RegisterResponse {
  @Field(() => User)
  user: User;
}
