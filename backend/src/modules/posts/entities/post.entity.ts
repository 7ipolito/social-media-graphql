import { Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooSchema } from 'mongoose';
import { User } from 'src/modules/users/entities/user.entity';

@Schema({ timestamps: true })
export class Post extends Document {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field()
  @Prop({ required: true })
  body: string;

  @Field()
  @Prop({ default: 0 })
  countLikes: number;

  @Field()
  @Prop()
  createdAt: Date;

  @Field(() => User)
  @Prop({ type: MongooSchema.Types.ObjectId, ref: 'User', required: true })
  user: MongooSchema.Types.ObjectId[];

  @Field(() => [User])
  @Prop({
    type: [{ type: MongooSchema.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  likes: MongooSchema.Types.ObjectId[];
}

export type PostDocument = Post & Document;

export const PostSchema = SchemaFactory.createForClass(Post);
