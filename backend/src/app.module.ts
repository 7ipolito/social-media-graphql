import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
// import { join } from 'path';
// import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
// import { UsersModule } from './users/users.module';
import { UserResolver } from './users/users.resolver';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      //ts-morph
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    UserResolver,
  ],
})
export class AppModule {}
