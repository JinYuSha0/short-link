import { IsString, IsNotEmpty } from 'class-validator';

export class AccessCreateDto {
  @IsString()
  @IsNotEmpty()
  readonly shortId: string;

  @IsNotEmpty()
  readonly isMobile: boolean;

  @IsString()
  readonly ip?: string;

  @IsString()
  readonly address?: string;

  @IsString()
  readonly referer?: string;
}
