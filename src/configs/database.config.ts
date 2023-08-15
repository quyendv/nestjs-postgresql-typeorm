import { registerAs } from '@nestjs/config';

const databaseConfig = registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/modules/**/entities/*.entity.js'],
  // synchronize: process.env.NODE_ENV === 'development',
  // logging: process.env.NODE_ENV === 'development',
  synchronize: false,
  logging: false,
  migrations: ['dist/modules/database/migrations/*.js'],
  migrationsTableName: 'migrations',
}));

export default databaseConfig;
