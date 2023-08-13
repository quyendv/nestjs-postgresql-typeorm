import { Controller, Get, Post } from '@nestjs/common';
import { TreeNestedService } from './tree-nested.service';

@Controller('trees-nested')
export class TreeNestedController {
  constructor(private readonly service: TreeNestedService) {}

  @Post()
  create() {
    return this.service.create();
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
