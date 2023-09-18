import { Image } from 'src/modules/images/image.entity';
import { Superpower } from '../../superpowers/superpower.entity';
import { IsArray, IsString, Validate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { NicknameUnique } from '../validators/is-nickname-unique';

export class CreateSuperheroDto {
  @IsString()
  @Validate(NicknameUnique)
  nickname: string;

  @IsString()
  real_name: string;

  @IsString()
  origin_description: string;

  @IsString()
  catch_phrase: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Image)
  images: Image[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Superpower)
  superpowers: Superpower[];
}
