import { Image } from '../image.type';
import { Superpower } from '../superpower.type';

export type Superhero = {
  id: number;
  nickname: string;
  real_name: string;
  origin_description: string;
  catch_phrase: string;
  superpowers: Superpower[];
  images: Image[];
};
