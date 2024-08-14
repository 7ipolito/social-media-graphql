import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import RedisStore from 'connect-redis';
import { redis } from './redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET',
    allowedHeaders: 'Content-Type, Authorization',
  });
  const configService = app.get(ConfigService);

  app.use(
    session({
      store: new RedisStore({
        client: redis,
        prefix: 'sess:', // Prefixo para chaves de sessão
      }),
      name: 'qid', // Nome do cookie de sessão
      secret: 'your-session-secret', // Substitua pelo seu segredo de sessão
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
      },
    }),
  );

  const port = configService.get<number>('PORT') || 4000;

  await app.listen(port);
}
bootstrap();
