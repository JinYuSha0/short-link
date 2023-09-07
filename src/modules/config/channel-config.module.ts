import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChannelConfigSchema } from './schemas/channel-config.schema';
import { ChannelConfigController } from './channel-config.controller';
import { ChannelConfigService } from './channel-config.service';
import CacheModule from '@modules/cache/cache.module';
import { AuthInterceptor } from '@interceptors/auth.interceptor';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ChannelConfig',
        schema: ChannelConfigSchema,
      },
    ]),
    CacheModule,
  ],
  controllers: [ChannelConfigController],
  providers: [ChannelConfigService, AuthInterceptor],
  exports: [ChannelConfigService],
})
export class ChannelConfigModule {}
