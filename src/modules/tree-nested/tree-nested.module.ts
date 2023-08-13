import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreeNested } from './entities/tree-nested.entity';
import { TreeNestedController } from './tree-nested.controller';
import { TreeNestedService } from './tree-nested.service';

@Module({
  imports: [TypeOrmModule.forFeature([TreeNested])],
  controllers: [TreeNestedController],
  providers: [TreeNestedService],
})
export class TreeNestedModule {}
