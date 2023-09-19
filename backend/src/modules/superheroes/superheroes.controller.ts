import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { EditSuperheroDto } from './dto/edit-superhero.dto';
import { IsSuperheroExistsPipe } from 'src/common/pipes/is-superhero-exists.pipe';

@Controller('superheroes')
export class SuperheroesController {
  constructor(private superheroesService: SuperheroesService) {}

  @Get()
  findAll(@Query('page', ParseIntPipe) page: number) {
    return this.superheroesService.findAll(page);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe, IsSuperheroExistsPipe) id: number) {
    return this.superheroesService.findOne(id);
  }

  @Post()
  createSuperhero(@Body() dto: CreateSuperheroDto) {
    return this.superheroesService.createSuperhero(dto);
  }

  @Patch(':id')
  editSuperhero(
    @Param('id', ParseIntPipe, IsSuperheroExistsPipe) id: number,
    @Body() dto: EditSuperheroDto
  ) {
    return this.superheroesService.editSuperhero(id, dto);
  }

  @Delete(':id')
  deleteSuperhero(@Param('id', ParseIntPipe, IsSuperheroExistsPipe) id: number) {
    return this.superheroesService.deleteSuperhero(id);
  }
}
