import { Repository } from 'typeorm';
import { BaseTestEntity } from '../entities/base-test.entity';

export class BaseTestRepository extends Repository<BaseTestEntity> {
  // declare other functions here, not declare in service (service only call function in here)
  functionTest() {
    return true;
  }
}
