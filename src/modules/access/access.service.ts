import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Access } from './interfaces/access.interface';
import { AccessCreateDto } from './dto/access-create.dto';
import axios from 'axios';
import { isRealIp } from '@utils/common';

@Injectable()
export class AccessService {
  constructor(
    @InjectModel('Access')
    private readonly AccessModel: Model<Access>,
  ) {}

  async create(dto: AccessCreateDto): Promise<Access> {
    let address: string;
    if (isRealIp(dto.ip)) {
      try {
        const res = await axios.get(
          `https://ip.taobao.com/outGetIpInfo?ip=${dto.ip}&accessKey=alibaba-inc`,
          { timeout: 1000 },
        );
        if (res.data.code === 0) {
          const {
            data: { isp, country, region, city },
          } = res.data;
          address = `${country}-${region}-${city}`;
        }
      } catch (err) {}
    }
    return await this.AccessModel.create({
      shortId: dto.shortId,
      isMobile: dto.isMobile,
      ip: dto.ip,
      referer: dto.referer,
      address,
    });
  }
}
