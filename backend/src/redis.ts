import { Redis } from 'ioredis';
import { config } from 'dotenv';

// Carregar variáveis de ambiente
config();

export const redis = new Redis({
  port: Number(process.env.REDIS_PORT) || 6379, // Porta padrão do Redis
  host: process.env.REDIS_HOST || 'localhost', // Host do Redis
  password: process.env.REDIS_PASSWORD, // Senha do Redis, se houver
});
