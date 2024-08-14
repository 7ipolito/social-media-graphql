import { Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooSchema } from 'mongoose';
import { User } from 'src/modules/users/entities/user.entity';

@Schema({ timestamps: true })
export class Post extends Document {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field()
  @Prop({ required: true })
  body: string;

  @Field()
  @Prop()
  createdAt: Date;

  @Field()
  @Prop({ required: true })
  username: string;

  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;
}
export type PostDocument = Post & Document;

export const PostSchema = SchemaFactory.createForClass(Post);
