import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from '../image.entity';
import { Repository } from 'typeorm';
import { unlink } from 'fs/promises';
import { MulterConfigService } from './multer-config.service';

@Injectable()
export class ImagesService {
  constructor(@InjectRepository(Image) private imagesRepository: Repository<Image>) {}
  private logger = new Logger(ImagesService.name);
  saveImage(url: string) {
    const image = this.imagesRepository.create({ url });
    return this.imagesRepository.save(image);
  }

  async deleteMessages(images: Image[]) {
    await this.imagesRepository.remove(images);
    images.forEach(async (image) => {
      const fileName = image.url.split('/').pop();
      await unlink(MulterConfigService.destination + fileName).catch((error) =>
        this.logger.error(error)
      );
    });
  }
}
