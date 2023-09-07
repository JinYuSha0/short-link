import { AccessService } from '@modules/access/access.service';
import { ChannelConfigService } from '@modules/config/channel-config.service';
import {
  Controller,
  Get,
  Param,
  Redirect,
  Req,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { getReallyIp, getReferer } from '@utils/common';
import isMobile from 'is-mobile';

@Controller()
export class AppController {
  constructor(
    private readonly channelConfigService: ChannelConfigService,
    private readonly accessService: AccessService,
  ) {}

  @Redirect()
  @Get('/:shortId')
  async root(@Param('shortId') shortId, @Req() req, @Res() res) {
    const data = await this.channelConfigService.findOne({ shortId });
    if (!data) throw new NotFoundException();
    const mobile = isMobile({ ua: req });
    const ip = getReallyIp(req);
    this.accessService.create({
      shortId,
      isMobile: mobile,
      ip: '113.110.32.232',
      referer: getReferer(req),
    });
    res.status(302).redirect(mobile ? data.mobileUrl : data.pcUrl);
  }
}
