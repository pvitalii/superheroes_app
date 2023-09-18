import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Superhero } from './superhero.entity';
import { ImagesModule } from '../images/images.module';
import { SuperheroesController } from './superheroes.controller';
import { SuperheroesService } from './superheroes.service';
import { NicknameUnique } from './validators/is-nickname-unique';

@Module({
  imports: [TypeOrmModule.forFeature([Superhero]), ImagesModule],
  providers: [SuperheroesService, NicknameUnique],
  controllers: [SuperheroesController]
})
export class SuperheroesModule {}
