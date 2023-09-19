import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Superhero } from './superhero.entity';
import { Repository } from 'typeorm';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { EditSuperheroDto } from './dto/edit-superhero.dto';
import { ImagesService } from '../images/services/images.service';

@Injectable()
export class SuperheroesService {
  constructor(
    @InjectRepository(Superhero) private superheroesRepository: Repository<Superhero>,
    private imagesService: ImagesService
  ) {}

  findAll(page: number): Promise<[Superhero[], number]> {
    const take = 5;
    const skip = take * (page - 1);
    return this.superheroesRepository.findAndCount({
      relations: {
        superpowers: true,
        images: true
      },
      take,
      skip
    });
  }

  findOne(id: number) {
    return this.superheroesRepository.findOne({
      where: { id },
      relations: {
        superpowers: true,
        images: true
      }
    });
  }

  findByNickname(nickname: string) {
    return this.superheroesRepository.findOneBy({ nickname });
  }

  async createSuperhero(dto: CreateSuperheroDto) {
    const superhero = this.superheroesRepository.create(dto);
    return this.superheroesRepository.save(superhero);
  }

  async editSuperhero(id: number, dto: EditSuperheroDto): Promise<Superhero> {
    const superhero = await this.superheroesRepository.save({ id, ...dto });
    return superhero;
  }

  async deleteSuperhero(id: number) {
    const superhero = await this.findOne(id);
    await this.superheroesRepository.remove(superhero);
    await this.imagesService.deleteMessages(superhero.images);
  }
}
