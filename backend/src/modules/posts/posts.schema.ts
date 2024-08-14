import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  body: string;

  @Field()
  username: string;

  @Field()
  createdAt: string;
}
