import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './entities/post.entity';
import { PostResolver } from './posts.resolver';
import { PostService } from './posts.service';
import { UsersModule } from '../users/users.module';
import { PubSubModule } from '../pubSub/pubSub.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    UsersModule,
    PubSubModule,
  ],

  providers: [PostResolver, PostService],
})
export class PostsModule {}
