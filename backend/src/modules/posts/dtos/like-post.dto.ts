import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IError } from 'src/types/IError';
import { Post } from '../entities/post.entity';

@InputType()
export class LikePostInput {
  @Field()
  postId: string;

  @Field()
  userId: string;
}

@ObjectType()
export class ErrorTypeLikePost implements IError {
  @Field()
  path: string;

  @Field()
  message: string;
}

@ObjectType()
export class CreateLikePostResponse {
  @Field(() => [ErrorTypeLikePost], { nullable: true })
  error?: ErrorTypeLikePost[];

  @Field(() => Post, { nullable: true })
  post?: Post;
}
