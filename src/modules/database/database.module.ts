import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE.HOST'),
        port: configService.get<number>('DATABASE.PORT') || 5432,
        username: configService.get<string>('DATABASE.USERNAME'),
        password: configService.get<string>('DATABASE.PASSWORD'),
        database: configService.get<string>('DATABASE.NAME'),
        logging: true,
        // entities: [User, Profile], // path is not cast like: @modules/**/entities/*.entity.ts, __dirname + /../**/*.entity.ts, ...
        migrations: [
          '@modules/database/migrations/*{.ts,.js}',
          // "dist/database/migrations/*.js",
        ],
        cli: {
          migrationsDir: '@modules/database/migrations',
        },
        // subscribers: ['@modules/**/subscribers/*.ts'],
        synchronize: true, // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
        autoLoadEntities: true, // every entity registered through the forFeature() method will be automatically added to the entities array of the configuration object. -> See more: https://docs.nestjs.com/techniques/database#auto-load-entities
      }),
    }),
  ],
})
export class DatabaseModule {}
