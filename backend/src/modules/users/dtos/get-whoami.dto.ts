import { Field, ObjectType } from '@nestjs/graphql';
import { ErrorType } from 'src/modules/register/dtos/register-user.dto';

@ObjectType()
export class UsersResponse {
  @Field(() => [ErrorType], { nullable: true })
  error?: ErrorType[];
  @Field(() => String, { nullable: true })
  userId?: string;
}
