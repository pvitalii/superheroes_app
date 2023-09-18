import { DataSource, DataSourceOptions } from 'typeorm';

const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`${process.cwd()}/dist/modules/*/*.entity.js`],
  migrations: [`${process.cwd()}/dist/database/migrations/*.js`]
};

export default new DataSource(typeOrmConfig);
