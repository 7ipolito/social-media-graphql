import { ObjectType, Field, ID } from '@nestjs/graphql';
import mongoose, { Document, Schema as MongooSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Post } from 'src/posts/entities/post.entity';
import * as bcrypt from 'bcryptjs';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => ID)
  _id: MongooSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true })
  username: string;

  @Field(() => String)
  @Prop({ required: true })
  email: string;

  @Field(() => String)
  @Prop()
  token: string;

  @Field(() => String)
  @Prop()
  password: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => [Post])
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }])
  posts: Post[];

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();

  // Gera um salt e criptografa a senha
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
