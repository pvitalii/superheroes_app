import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { ImagesService } from './services/images.service';
import { MulterConfigService } from './services/multer-config.service';
import { MulterModule } from '@nestjs/platform-express';
import { ImagesController } from './images.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    MulterModule.registerAsync({
      useClass: MulterConfigService
    })
  ],
  providers: [ImagesService],
  controllers: [ImagesController],
  exports: [ImagesService]
})
export class ImagesModule {}
