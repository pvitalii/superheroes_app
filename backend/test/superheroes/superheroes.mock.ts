export const mockSuperhero = {
  id: 1,
  nickname: 'Spider Man',
  real_name: 'Peter Parker',
  origin_description:
    'American teenager Peter Parker, a poor sickly orphan, is bitten by a radioactive spider. As a result of the bite, he gains superhuman strength, speed, and agility, along with the ability to cling to walls, turning him into Spider-Man',
  catch_phrase: 'With great power comes great responsibility',
  images: [
    {
      id: 1,
      url: 'https://wallpapers.com/images/featured/spiderman-p4ashmgeamn2mvkn.jpg',
      superhero: null
    }
  ],
  superpowers: [{ id: 1, name: 'Solar flare' }]
};

export const mockCreateDto = {
  nickname: 'Spider Man',
  real_name: 'Peter Parker',
  origin_description: 'sdfsfsdf',
  catch_phrase: 'qweqweqw',
  images: [
    {
      id: 1,
      url: 'https://wallpapers.com/images/featured/spiderman-p4ashmgeamn2mvkn.jpg',
      superhero: null
    }
  ],
  superpowers: [{ id: 1, name: 'Solar flare' }]
};

export const superheroesMockService = {
  findAll: jest.fn().mockResolvedValue([[mockSuperhero], 1]),
  findOne: jest.fn().mockResolvedValue(mockSuperhero),
  findByNickname: jest.fn().mockResolvedValue(mockSuperhero),
  createSuperhero: jest.fn().mockResolvedValue({ ...mockCreateDto, id: 1 }),
  editSuperhero: jest.fn().mockResolvedValue({ ...mockSuperhero, ...mockCreateDto }),
  deleteSuperhero: jest.fn()
};

export const superheroesMockRepo = {
  findAndCount: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn()
};

export const imagesMockService = {
  saveImages: jest.fn(),
  deleteImages: jest.fn()
};

export const imagesMockRepo = {
  save: jest.fn(),
  remove: jest.fn()
};
