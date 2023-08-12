import { ConfigService } from '@nestjs/config';
import 'dotenv/config'; // mandatory, can import {config} from 'dotenv'; && config();
import { DataSource, DataSourceOptions } from 'typeorm';

const configService = new ConfigService();

// NOTE: fix issue absolute path: https://github.com/w3tecch/typeorm-seeding/issues/81
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',

  // host: configService.get<string>('DATABASE.HOST'),
  // port: configService.get<number>('DATABASE.PORT', 5432),
  // username: configService.get<string>('DATABASE.USERNAME'),
  // password: configService.get<string>('DATABASE.PASSWORD'),
  // database: configService.get<string>('DATABASE.NAME'),

  host: configService.get<string>('DB_HOST'), // process.env.DB_HOST,
  port: configService.get<number>('DB_PORT', 5432), // Number(process.env.DB_PORT) || 5432
  username: configService.get<string>('DB_USERNAME'), // process.env.DB_USERNAME
  password: configService.get<string>('DB_PASSWORD'), // process.env.DB_PASSWORD
  database: configService.get<string>('DB_NAME'), // process.env.DB_NAME

  entities: ['dist/modules/**/entities/*.entity.js'], // instead of [`${__dirname}/../modules/**/entities/*.entity.{js,ts}`],
  migrations: ['dist/modules/database/migrations/*.js'],
  // migrationsTableName: 'migrations',
  // logging: true, // unnecessary, just use for migration
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
