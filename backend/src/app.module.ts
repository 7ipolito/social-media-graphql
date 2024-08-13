import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { LogoutModule } from './logout/logout.module';
import Redis from 'ioredis';

const redisClient = new Redis();

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<MongooseModuleOptions> => {
        const uri = configService.get<string>('MONGODB_URI');
        if (!uri) {
          throw new Error(
            'MONGODB_URI is not defined in environment variables',
          );
        }
        return {
          uri,
        };
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req, res }) => ({
        req,
        res,
        redis: redisClient,
        session: req.session,
      }),
    }),
    UsersModule,
    PostsModule,
    LoginModule,
    RegisterModule,
    LogoutModule,
  ],
})
export class AppModule {}
