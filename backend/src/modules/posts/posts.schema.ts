import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../users/users.schema';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  body: string;

  @Field({ defaultValue: 0 })
  countLikes: number;

  @Field()
  createdAt: string;

  @Field(() => User)
  user: User;

  @Field(() => [User], { nullable: true })
  likes: User[];
}
