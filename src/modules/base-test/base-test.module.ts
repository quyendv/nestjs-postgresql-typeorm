import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseTestController } from './base-test.controller';
import { BaseTestService } from './base-test.service';
import { BaseTestEntity } from './entities/base-test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BaseTestEntity])],
  controllers: [BaseTestController],
  providers: [BaseTestService],
})
export class BaseTestModule {}
