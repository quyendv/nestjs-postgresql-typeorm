import { Controller, Get, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create() {
    return this.employeeService.create();
  }

  @Get()
  findTrees() {
    return this.employeeService.findTrees();
  }

  @Get('roots')
  findRoots() {
    return this.employeeService.findRoots();
  }

  @Get('descendants')
  findDescendants() {
    return this.employeeService.findDescendants();
  }

  @Get('ancestors')
  findAncestors() {
    return this.employeeService.findAncestors();
  }

  @Get('directly-ancestor')
  findDirectlyAncestor() {
    return this.employeeService.findDirectlyAncestor();
  }
}
