import { ObjectType, Field, ID } from '@nestjs/graphql';
import mongoose, { Document, Schema as MongooSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Post } from 'src/modules/posts/entities/post.entity';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => ID)
  _id: MongooSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true, unique: true })
  clerkUserId: string;

  @Field(() => String)
  @Prop({ required: true })
  email: string;

  @Field(() => String)
  @Prop()
  username: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => [Post])
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }])
  posts: Post[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
