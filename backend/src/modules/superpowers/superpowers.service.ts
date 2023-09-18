import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Superpower } from './superpower.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SuperpowersService {
  constructor(
    @InjectRepository(Superpower) private superpowersRepository: Repository<Superpower>
  ) {}

  findAll() {
    return this.superpowersRepository.find();
  }
}
