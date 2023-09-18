import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm';
import { Image } from '../images/image.entity';
import { Superpower } from '../superpowers/superpower.entity';

@Entity()
@Unique(['nickname'])
export class Superhero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  real_name: string;

  @Column()
  origin_description: string;

  @Column()
  catch_phrase: string;

  @OneToMany(() => Image, (image) => image.superhero, { cascade: ['remove'] })
  images: Image[];

  @ManyToMany(() => Superpower, { onDelete: 'CASCADE' })
  @JoinTable()
  superpowers: Superpower[];
}
