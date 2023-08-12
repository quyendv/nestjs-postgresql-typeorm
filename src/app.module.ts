import appConfig from '@configs/app.config';
import databaseConfig from '@configs/database.config';
import { CategoryModule } from '@modules/categories/category.module';
import { PermissionModule } from '@modules/permissions/permission.module';
import { QuestionModule } from '@modules/questions/question.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { ProfileModule } from './modules/profiles/profile.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [/* envConfig */ appConfig, databaseConfig],
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    DatabaseModule,
    UserModule,
    ProfileModule,
    PermissionModule,
    QuestionModule,
    CategoryModule,
  ],
})
export class AppModule {}
