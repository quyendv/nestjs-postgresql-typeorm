import { BaseService } from '@modules/base/a.base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTestEntity } from './entities/base-test.entity';
import { BaseTestRepository } from './repositories/base-test.repository';

@Injectable()
export class BaseTestService extends BaseService<BaseTestEntity, BaseTestRepository> {
  // NOTE: repository của BaseService nên để private thay vì protected vì ở đây đã có repository riêng để tương tác rồi. Hơn nữa ta càng muốn loại bỏ cả repository riêng ở đây vì chỉ nên tương tác với db trong BaseTestRepository thôi
  // Chỗ này phải Inject thì mới khởi tạo được, nếu chỉ truyền dạng params sẽ là undefined vì có ai khởi tạo dùm đâu
  constructor(@InjectRepository(BaseTestEntity) private readonly baseTestRepository: BaseTestRepository) {
    super(baseTestRepository);
  }

  // others service methods
  createBaseTest() {
    return this.createOne({ someKey: 'unknown' }); // dùng từ BaseService
  }

  other() {
    return this.baseTestRepository.functionTest(); // dùng từ BaseTestRepository
  }
}
