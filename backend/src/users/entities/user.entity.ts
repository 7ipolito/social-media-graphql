import { ObjectType, Field } from '@nestjs/graphql';
import mongoose, { Document, Schema as MongooSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Post } from 'src/posts/entities/post.entity';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  // We are using the @Field() decorator in addition to the @Prop() one to specify that the class propery is a GraphQL field
  // In other words, that decorator isn't necessary for Rest APIs

  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  // Add user properties
  @Field(() => String)
  @Prop()
  username: string;

  @Field(() => String)
  @Prop()
  password: string;

  @Field(() => String)
  @Prop()
  email: string;

  @Field(() => String)
  @Prop()
  token: string;

  @Field()
  createdAt: Date;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }])
  posts: Post[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
