import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ChannelConfigModule } from '@modules/config/channel-config.module';
import { ConfigModule } from '@nestjs/config';
import CacheModule from '@modules/cache/cache.module';
import DBModule from '@modules/db/db.module';
import appConfiguration from '@configs/app.config';
import mongodbConfiguration from '@configs/mongodb.config';
import redisConfiguration from '@configs/redis.config';
import { AppController } from './app.controller';
import { AccessModule } from '@modules/access/access.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      ignoreEnvFile: false,
      isGlobal: true,
      load: [appConfiguration, mongodbConfiguration, redisConfiguration],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        APP_PORT: Joi.number().default(3000),
      }),
    }),
    DBModule,
    CacheModule,
    ChannelConfigModule,
    AccessModule,
  ],
  controllers: [AppController],
  exports: [CacheModule],
})
export class AppModule {}
