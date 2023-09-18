import { Image } from '../image.type';

export type ActionFormValues = {
  nickname: string;
  real_name: string;
  origin_description: string;
  catch_phrase: string;
  superpowers: string[];
  images: File[] | Image[];
};
