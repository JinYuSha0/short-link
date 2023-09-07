import { IsString, IsNotEmpty } from 'class-validator';

export class ChannelConfigCreateDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly mobileUrl: string;

  @IsString()
  @IsNotEmpty()
  readonly pcUrl: string;
}
