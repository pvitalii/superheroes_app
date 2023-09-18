import { Controller, Get } from '@nestjs/common';
import { SuperpowersService } from './superpowers.service';

@Controller('superpowers')
export class SuperpowersController {
  constructor(private superpowersService: SuperpowersService) {}

  @Get()
  findAll() {
    return this.superpowersService.findAll();
  }
}
