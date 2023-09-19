import { SuperheroesController } from 'src/modules/superheroes/superheroes.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesService } from 'src/modules/superheroes/superheroes.service';
import { mockCreateDto, mockSuperhero, superheroesMockService } from './superheroes.mock';

describe('SuperheroesController', () => {
  let superheroesController: SuperheroesController;
  let superheroesService: SuperheroesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroesController],
      providers: [SuperheroesService]
    })
      .overrideProvider(SuperheroesService)
      .useValue(superheroesMockService)
      .compile();

    superheroesController = module.get<SuperheroesController>(SuperheroesController);
    superheroesService = module.get<SuperheroesService>(SuperheroesService);
  });

  it('should be defined', () => {
    expect(superheroesController).toBeDefined();
    expect(superheroesService).toBeDefined();
  });

  describe('create', () => {
    it('should create a superhero', async () => {
      const superhero = await superheroesController.createSuperhero(mockCreateDto);
      expect(superheroesService.createSuperhero).toHaveBeenCalledTimes(1);
      expect(superhero).toEqual({ ...mockCreateDto, id: 1 });
    });
  });

  describe('findAll', () => {
    it('should return an array of superheroes and their count', async () => {
      const query = { page: '1' };
      const superheroes = await superheroesController.findAll(parseInt(query.page));
      expect(superheroesService.findAll).toHaveBeenCalledTimes(1);
      expect(superheroes).toEqual([[mockSuperhero], 1]);
    });
  });

  describe('findOne', () => {
    it('should return superhero by id', async () => {
      const superhero = await superheroesController.findOne(1);
      expect(superheroesService.findOne).toHaveBeenCalledTimes(1);
      expect(superhero).toEqual(mockSuperhero);
    });
  });

  describe('update', () => {
    it('should update superhero by id', async () => {
      const updatedSuperhero = await superheroesController.editSuperhero(1, mockCreateDto);
      expect(superheroesService.editSuperhero).toHaveBeenCalledTimes(1);
      expect(updatedSuperhero).toEqual({ ...mockSuperhero, ...mockCreateDto });
    });
  });

  describe('remove', () => {
    it('should delete a patient', async () => {
      await superheroesController.deleteSuperhero(1);
      expect(superheroesService.deleteSuperhero).toHaveBeenCalledTimes(1);
      expect(superheroesService.deleteSuperhero).toHaveBeenCalledWith(1);
    });
  });
});
