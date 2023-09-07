import { Document } from 'mongoose';

export interface Access extends Document {
  shortId: string;
  isMobile: boolean;
  ip?: string;
  address?: string;
  referer?: string;
}
