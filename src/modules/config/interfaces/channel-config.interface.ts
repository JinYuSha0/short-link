import { Document } from 'mongoose';

export interface ChannelConfig extends Document {
  shortId: string;
  title: string;
  mobileUrl: string;
  pcUrl: string;
}
