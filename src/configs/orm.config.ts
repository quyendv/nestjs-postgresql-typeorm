import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DATABASE.HOST'),
  port: configService.get<number>('DATABASE.PORT') || 5432,
  username: configService.get<string>('DATABASE.USERNAME'),
  password: configService.get<string>('DATABASE.PASSWORD'),
  database: configService.get<string>('DATABASE.NAME'),
  entities: [__dirname + '../modules/**/entities/*.entity.{js,ts}'],
  migrations: [__dirname + '../modules/database/migrations/*{.ts,.js}'],
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
