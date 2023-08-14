import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Employee) private readonly employeeTreeRepository: TreeRepository<Employee>,
  ) {}

  async create() {
    const employee1 = new Employee();
    employee1.name = 'Employee 1';
    await this.employeeRepository.save(employee1);

    const employee11 = this.employeeRepository.create({ name: 'Employee 11', parent: employee1 });
    await this.employeeRepository.save(employee11);

    // NOTE: Không hiểu tại sao nếu tạo bằng new Employee() rồi set thuộc tính và save thì được, dùng create rồi save cũng được, nhưng dùng insert lại bị lỗi không hoạt động đúng. StackOverflow: https://stackoverflow.com/questions/71830728/unable-to-make-tree-with-closure-table-in-typeorm
    // Có vẻ như insert và upsert không lưu quan hệ, đọc d.ts của method thấy vậy -> nên dùng save, tuy nhiên cũng nên hạn chế: https://dev.to/rishit/optimizing-typeorm-tips-from-experience-part-1-dont-use-save-4ke9

    // const employee12 = await this.employeeRepository.insert({ name: 'Employee 12', parent: employee1 });
    // const employee111 = await this.employeeRepository.insert({ name: 'Employee 111', parent: employee11 });
    // const employee112 = await this.employeeRepository.insert({ name: 'Employee 112', parent: employee11 });

    // NOTE: Thay vì dùng insert như trên lại phải dùng như này
    const employee12 = this.employeeRepository.create({ name: 'Employee 12', parent: employee1 });
    await this.employeeRepository.save(employee12);

    const employee111 = this.employeeRepository.create({ name: 'Employee 111', parent: employee11 });
    await this.employeeRepository.save(employee111);

    const employee112 = this.employeeRepository.create({ name: 'Employee 112', parent: employee11 });
    await this.employeeRepository.save(employee112);

    return employee1;
  }

  async findTrees() {
    return /* await */ this.employeeTreeRepository.findTrees({
      // depth: 5,
    });
  }

  async findRoots() {
    return /* await */ this.employeeTreeRepository.findRoots(); // all entity depth = 0, no parent
  }

  async findDescendants() {
    const root = await this.findRoots();

    return /* await */ this.employeeTreeRepository.findDescendants(root[0] /*, { depth: 2 } */); // all descendants into an array 1 level
  }

  async findAncestors() {
    const employees = await this.findDescendants();
    return this.employeeTreeRepository.findAncestors(employees[2]); // mảng các ancestor
  }

  async findDirectlyAncestor() {
    return this.employeeRepository.findOne({ where: { id: 3 }, relations: { parent: true } });
    // return this.employeeRepository.findOne({ where: { id: 3 }, relations: { parent: { parent: true } } }); // populate parent.parent
    // return this.employeeRepository.findOne({ where: { id: 3 }, relations: ['parent', 'parent.parent'] }); // other way of above line
  }

  /*** Others:
   * countDescendants
   * findAncestors
   * findAncestorsTree
   * -> options are available: relations
   */
}
