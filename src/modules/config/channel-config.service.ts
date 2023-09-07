import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChannelConfig } from './interfaces/channel-config.interface';
import { ChannelConfigCreateDto } from './dto/channel-config-create.dto';
import { ChannelConfigFindDto } from './dto/channel-config-find.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import ShortUniqueId from 'short-unique-id';

@Injectable()
export class ChannelConfigService {
  constructor(
    @InjectModel('ChannelConfig')
    private readonly ChannelConfigModel: Model<ChannelConfig>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(dto: ChannelConfigCreateDto): Promise<ChannelConfig> {
    return await this.ChannelConfigModel.create({
      shortId: new ShortUniqueId({ length: 4 }).rnd(),
      title: dto.title,
      mobileUrl: dto.mobileUrl,
      pcUrl: dto.pcUrl,
    });
  }

  async delete(dto: ChannelConfigFindDto): Promise<boolean> {
    await this.ChannelConfigModel.deleteOne({ shortId: dto.shortId });
    return true;
  }

  async find(): Promise<ChannelConfig[]> {
    return await this.ChannelConfigModel.find();
  }

  async findOne(dto: ChannelConfigFindDto): Promise<ChannelConfig> {
    const cache: ChannelConfig = await this.cacheManager.get(dto.shortId);
    if (cache) return cache;
    const data = await this.ChannelConfigModel.findOne({
      shortId: dto.shortId,
    });
    if (data) {
      await this.cacheManager.set(dto.shortId, data);
    }
    return data;
  }
}
