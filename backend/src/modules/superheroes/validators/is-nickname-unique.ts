import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { SuperheroesService } from '../superheroes.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'IsNicknameUnique', async: false })
@Injectable()
export class NicknameUnique implements ValidatorConstraintInterface {
  constructor(private superheroesService: SuperheroesService) {}

  async validate(nickname: string) {
    const user = await this.superheroesService.findByNickname(nickname);
    return !user;
  }

  defaultMessage() {
    return 'Nickname must be unique';
  }
}
