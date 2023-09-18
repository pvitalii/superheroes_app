import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Superpower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
