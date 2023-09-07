import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT || 6379,
  pass: process.env.REDIS_PASS,
  ttl: process.env.REDIS_TTL,
}));
