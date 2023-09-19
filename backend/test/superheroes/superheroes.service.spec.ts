import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Superhero } from 'src/modules/superheroes/superhero.entity';
import { SuperheroesService } from 'src/modules/superheroes/superheroes.service';
import { Repository } from 'typeorm';
import {
  imagesMockRepo,
  mockCreateDto,
  mockSuperhero,
  superheroesMockRepo
} from './superheroes.mock';
import { ImagesService } from 'src/modules/images/services/images.service';
import { Image } from 'src/modules/images/image.entity';

describe('SuperheroesService', () => {
  let superheroesService: SuperheroesService;
  let imagesService: ImagesService;
  let superheroesRepo: Repository<Superhero>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuperheroesService,
        ImagesService,
        {
          provide: getRepositoryToken(Superhero),
          useValue: superheroesMockRepo
        },
        {
          provide: getRepositoryToken(Image),
          useValue: imagesMockRepo
        }
      ]
    }).compile();

    superheroesService = module.get<SuperheroesService>(SuperheroesService);
    imagesService = module.get<ImagesService>(ImagesService);
    superheroesRepo = module.get<Repository<Superhero>>(getRepositoryToken(Superhero));
  });

  it('should be defined', () => {
    expect(superheroesService).toBeDefined();
  });

  describe('create', () => {
    it('should create a superhero', async () => {
      jest.spyOn(superheroesRepo, 'create').mockReturnValue(mockSuperhero);
      jest.spyOn(superheroesRepo, 'save').mockResolvedValue({ ...mockSuperhero, ...mockCreateDto });
      const superhero = await superheroesService.createSuperhero(mockCreateDto);
      expect(superheroesRepo.create).toHaveBeenCalledTimes(1);
      expect(superheroesRepo.save).toHaveBeenCalledTimes(1);
      expect(superheroesRepo.save).toHaveBeenCalledWith(mockSuperhero);
      expect(superhero).toEqual({ ...mockCreateDto, id: 1 });
    });
  });

  describe('findAll', () => {
    it('should return an array of superheroes and their count', async () => {
      const query = { page: '1' };
      const take = 5;
      const skip = take * (parseInt(query.page) - 1);

      const spy = jest
        .spyOn(superheroesRepo, 'findAndCount')
        .mockResolvedValue([[mockSuperhero], 1]);
      const superheroes = await superheroesService.findAll(parseInt(query.page));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({
        relations: {
          superpowers: true,
          images: true
        },
        take,
        skip
      });
      expect(superheroes).toEqual([[mockSuperhero], 1]);
    });
  });

  describe('findOne', () => {
    it('should find and return superhero by id', async () => {
      const spy = jest.spyOn(superheroesRepo, 'findOne').mockResolvedValue(mockSuperhero);
      const superhero = await superheroesService.findOne(1);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({
        relations: {
          superpowers: true,
          images: true
        },
        where: {
          id: 1
        }
      });
      expect(superhero).toEqual(mockSuperhero);
    });
  });

  describe('findByNickname', () => {
    it('should find and return superhero by nickname', async () => {
      const spy = jest.spyOn(superheroesRepo, 'findOneBy').mockResolvedValue(mockSuperhero);
      const superhero = await superheroesService.findByNickname('Spider Man');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ nickname: 'Spider Man' });
      expect(superhero).toEqual(mockSuperhero);
    });
  });

  describe('update', () => {
    it('should update superhero by id', async () => {
      const updatedSuperhero = { ...mockSuperhero, nickname: 'Batman' };
      const spy = jest.spyOn(superheroesRepo, 'save').mockResolvedValue(updatedSuperhero);
      const superhero = await superheroesService.editSuperhero(1, { nickname: 'Batman' });
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith({ id: 1, nickname: 'Batman' });
      expect(superhero).toEqual(updatedSuperhero);
    });
  });

  describe('remove', () => {
    it('should delete a superhero', async () => {
      jest.spyOn(superheroesRepo, 'findOne');
      jest.spyOn(superheroesRepo, 'remove');
      jest.spyOn(imagesService, 'deleteMessages');

      await superheroesService.deleteSuperhero(1);
      expect(superheroesRepo.findOne).toHaveBeenCalledTimes(2);
      expect(superheroesRepo.remove).toHaveBeenCalledTimes(1);
      expect(superheroesRepo.remove).toHaveBeenCalledWith(mockSuperhero);
      expect(imagesService.deleteMessages).toHaveBeenCalledTimes(1);
    });
  });
});
