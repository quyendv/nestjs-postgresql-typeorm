import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterializedPath } from './entities/materialized.entity';
import { MaterializedPathController } from './materialized.controller';
import { MaterializedPathService } from './materialized.service';

@Module({
  imports: [TypeOrmModule.forFeature([MaterializedPath])],
  controllers: [MaterializedPathController],
  providers: [MaterializedPathService],
})
export class MaterializedPathModule {}
