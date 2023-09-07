import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { ChannelConfigService } from './channel-config.service';
import { ChannelConfigCreateDto } from './dto/channel-config-create.dto';
import { ChannelConfigFindDto } from './dto/channel-config-find.dto';
import { ValidationPipe } from '@pipes/validation.pipe';
import { AuthInterceptor } from '@interceptors/auth.interceptor';

@Controller('config')
@UseInterceptors(AuthInterceptor)
export class ChannelConfigController {
  constructor(private readonly channelConfigService: ChannelConfigService) {}

  @Post('create')
  create(@Body(new ValidationPipe()) body: ChannelConfigCreateDto) {
    return this.channelConfigService.create(body);
  }

  @Post('delete')
  delete(@Query(new ValidationPipe()) body: ChannelConfigFindDto) {
    return this.channelConfigService.delete(body);
  }

  @Get('list')
  all() {
    return this.channelConfigService.find();
  }

  @Get('one')
  one(@Query(new ValidationPipe()) body: ChannelConfigFindDto) {
    return this.channelConfigService.findOne(body);
  }
}
