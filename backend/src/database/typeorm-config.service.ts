import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  private dbConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [`${process.cwd()}/dist/modules/**/*.entity.js`],
    migrations: [`${process.cwd()}/dist/database/migrations/*.js`]
  };

  createTypeOrmOptions(): TypeOrmModuleOptions {
    switch (process.env.NODE_ENV) {
      case 'development':
        return {
          ...this.dbConfig,
          synchronize: true,
          dropSchema: true
        };

      case 'production':
        return {
          ...this.dbConfig
        };
    }
  }
}
