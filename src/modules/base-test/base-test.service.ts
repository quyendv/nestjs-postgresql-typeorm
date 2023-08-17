import { BaseService } from '@modules/base/a.base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseTestEntity } from './entities/base-test.entity';

@Injectable()
export class BaseTestService extends BaseService<BaseTestEntity> {
  // NOTE: repository của BaseService nên để private thay vì protected vì ở đây đã có repository riêng để tương tác rồi. Hơn nữa ta càng muốn loại bỏ cả repository riêng ở đây vì chỉ nên tương tác với db trong BaseTestRepository thôi
  // Chỗ này phải Inject thì mới khởi tạo được, nếu chỉ truyền dạng params sẽ là undefined vì có ai khởi tạo dùm đâu
  constructor(@InjectRepository(BaseTestEntity) private readonly baseTestRepository: Repository<BaseTestEntity>) {
    super(baseTestRepository);
  }

  // others service methods
  createBaseTest() {
    return this.createOne({ someKey: 'unknown' }); // dùng từ BaseService
  }

  updateBaseTest(id: string) {
    return this.updateOne(id, { someKey: 'unknown1', id: 'ae5dfd61-890b-47e8-94e3-ae30ba897d7b' });
  }
}
