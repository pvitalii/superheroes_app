import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SuperheroesModule } from './modules/superheroes/superheroes.module';
import { ImagesModule } from './modules/images/images.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterConfigService } from './modules/images/services/multer-config.service';
import { DatabaseModule } from './database/database.module';
import { SuperpowersModule } from './modules/superpowers/superpowers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: MulterConfigService.destination
    }),
    DatabaseModule,
    SuperheroesModule,
    ImagesModule,
    SuperpowersModule
  ]
})
export class AppModule {}
