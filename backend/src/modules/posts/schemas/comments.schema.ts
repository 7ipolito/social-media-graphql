import { ObjectType, Field } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Schema as MongooSchema } from 'mongoose';
import { User } from '../../users/users.schema';

@ObjectType()
export class Comment {
  @Field(() => String)
  text: string;

  @Field(() => User)
  @Prop({ type: MongooSchema.Types.ObjectId, ref: 'User' })
  user: MongooSchema.Types.ObjectId;

  @Field(() => Date)
  createdAt: Date;
}
