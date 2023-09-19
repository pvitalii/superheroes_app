import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { SuperheroesService } from 'src/modules/superheroes/superheroes.service';

@Injectable()
export class IsSuperheroExistsPipe implements PipeTransform<number, Promise<number>> {
  constructor(private superheroesService: SuperheroesService) {}
  async transform(value: number) {
    const note = await this.superheroesService.findOne(value);
    if (!note) {
      throw new NotFoundException('Superhero with this id doesn`t exist');
    }
    return value;
  }
}
