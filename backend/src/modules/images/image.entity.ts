import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Superhero } from '../superheroes/superhero.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Superhero, (superhero) => superhero.images, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  superhero: Superhero;
}
