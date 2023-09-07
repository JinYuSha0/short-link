import { IsString, IsNotEmpty } from 'class-validator';

export class ChannelConfigFindDto {
  @IsString()
  @IsNotEmpty()
  readonly shortId: string;
}
