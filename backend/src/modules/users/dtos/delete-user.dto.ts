import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IError } from 'src/types/IError';

@InputType()
export class DeleteInput {
  @Field()
  id: string;
}
@ObjectType()
export class ErrorTypeDelete implements IError {
  @Field()
  path: string;

  @Field()
  message: string;
}
@ObjectType()
export class DeleteResponse {
  @Field(() => [ErrorTypeDelete], { nullable: true })
  error?: ErrorTypeDelete[];
}
