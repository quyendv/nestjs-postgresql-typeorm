import { Controller, Param, Patch, Post } from '@nestjs/common';
import { BaseTestService } from './base-test.service';

@Controller('base-test')
export class BaseTestController {
  constructor(private readonly baseTestService: BaseTestService) {}

  // other routes for testing services
  @Post()
  create() {
    return this.baseTestService.createBaseTest();
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.baseTestService.updateBaseTest(id);
  }
}
