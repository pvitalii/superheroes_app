import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ImagesService } from './services/images.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Image } from './image.entity';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('images'))
  saveImages(
    @UploadedFiles()
    images: Express.Multer.File[]
  ) {
    return Promise.all(
      images.map(async (image) => {
        const pathToImage = `${process.env.BACKEND_ORIGIN}/${image.path.split('/').pop()}`;
        const savedImage = await this.imagesService.saveImage(pathToImage);
        return savedImage;
      })
    );
  }

  @Post('delete')
  deleteImages(@Body() body: { images: Image[] }) {
    console.log(body.images);
    return this.imagesService.deleteMessages(body.images);
  }
}
