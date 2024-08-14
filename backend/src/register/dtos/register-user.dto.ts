import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IError } from 'src/login/login.service';

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
export class ErrorType implements IError {
  @Field()
  path: string;

  @Field()
  message: string;
}
@ObjectType()
export class RegisterResponse {
  @Field(() => [ErrorType], { nullable: true })
  error?: ErrorType[];
}
