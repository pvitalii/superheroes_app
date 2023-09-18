import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Superpower } from './superpower.entity';
import { SuperpowersService } from './superpowers.service';
import { SuperpowersController } from './superpowers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Superpower])],
  providers: [SuperpowersService],
  controllers: [SuperpowersController]
})
export class SuperpowersModule {}
