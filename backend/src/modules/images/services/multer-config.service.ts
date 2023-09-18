import { BadRequestException, Injectable } from '@nestjs/common';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  static destination = process.cwd() + '/src/modules/images/local-uploads/';

  createMulterOptions(): MulterModuleOptions {
    return {
      limits: {
        fileSize: 10 * 1024 * 1024
      },
      fileFilter(req, file, callback) {
        if (!file.mimetype.match(/(jpg|jpeg|png)$/)) {
          callback(
            new BadRequestException(`Unsupported file type ${extname(file.originalname)}`),
            false
          );
        }
        callback(null, true);
      },
      storage: diskStorage({
        destination: MulterConfigService.destination,
        filename: function (req, file, cb) {
          cb(null, uuidv4() + extname(file.originalname));
        }
      })
    };
  }
}
