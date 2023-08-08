import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './configs/app.config';
import { databaseConfig } from './configs/database.config';
import { DatabaseModule } from './modules/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, appConfig],
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    DatabaseModule,
  ],
})
export class AppModule {}
