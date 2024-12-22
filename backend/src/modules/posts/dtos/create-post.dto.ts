import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IError } from 'src/types/IError';
import { Post } from '../entities/post.entity';

@InputType()
export class CreatePostInput {
  @Field()
  body: string;

  @Field()
  clerkUserId: string;
}

@ObjectType()
export class ErrorTypeCreatePost implements IError {
  @Field()
  path: string;

  @Field()
  message: string;
}

@ObjectType()
export class CreatePostResponse {
  @Field(() => [ErrorTypeCreatePost], { nullable: true })
  error?: ErrorTypeCreatePost[];

  @Field(() => Post, { nullable: true })
  post?: Post;
}
