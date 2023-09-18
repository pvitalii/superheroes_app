import { Type } from 'class-transformer';
import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Superpower } from 'src/modules/superpowers/superpower.entity';
import { Image } from 'src/modules/images/image.entity';

export class EditSuperheroDto {
  @IsString()
  nickname?: string;

  @IsString()
  real_name?: string;

  @IsString()
  origin_description?: string;

  @IsString()
  catch_phrase?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Image)
  images?: Image[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Superpower)
  superpowers?: Superpower[];
}
