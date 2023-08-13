import { Controller, Get, Post } from '@nestjs/common';
import { MaterializedPathService } from './materialized.service';

@Controller('materialized-paths')
export class MaterializedPathController {
  constructor(private readonly service: MaterializedPathService) {}

  @Post()
  create() {
    return this.service.create();
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
