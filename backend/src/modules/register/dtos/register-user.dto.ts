import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IError } from '../register.service';

@InputType()
export class RegisterInput {
  @Field()
  clerkUserId: string;

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
