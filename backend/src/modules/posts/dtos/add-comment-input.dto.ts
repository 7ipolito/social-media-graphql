import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddCommentInput {
  @Field(() => String)
  postId: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  text: string;
}
