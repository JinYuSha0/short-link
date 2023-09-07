import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

export default CacheModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    store: await redisStore({
      socket: {
        host: configService.get<string>('redis.host'),
        port: configService.get<number>('redis.port'),
        passphrase: configService.get<string>('redis.pass'),
      },
    }),
    ttl: configService.get<number>('redis.ttl'),
  }),
  inject: [ConfigService],
});
