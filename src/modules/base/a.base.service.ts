import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  In,
  Repository,
  UpdateResult,
} from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { BaseEntity } from './a.base.entity';
import { IBaseService } from './i.base.service';

export abstract class BaseService<T extends BaseEntity, R extends Repository<T>> implements IBaseService<T> {
  // NOTE: Quan trọng, khi service khác kế thừa thì sẽ phải InjectRepository trong class con đó và phải truyền vào repository tương ứng, vậy nên repository bên dưới nên để private thay vì protected.
  // Cụ thể: class con phải inject nên nếu muốn đã có repository trong class con dùng rồi không cần protected ở đây. Hơn nữa ta còn muốn loại bỏ entityRepository ở class con mà không được, vì nên tách ra class EntityRepository riêng để query tới db, không nên dùng trong service (service chỉ gọi lại hàm thôi)
  constructor(private readonly repository: R) {}

  createOne(data: DeepPartial<T>): Promise<T> {
    return this.repository.save(data);
  }

  createMany(dataArray: DeepPartial<T>[]): Promise<T[]> {
    return this.repository.save(dataArray);
  }

  findById(id: EntityId): Promise<T | null> {
    return this.repository.findOneBy({ id } as FindOptionsWhere<T>);
  }

  findByIds(ids: EntityId[]): Promise<T[]> {
    return this.repository.findBy({ id: In(ids) } as FindOptionsWhere<T>);
  }

  findOneWithOptions(options: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne(options);
  }

  findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async updateOne(id: EntityId, data: DeepPartial<T>): Promise<T | null> {
    /** TypeORM không cảnh báo cập nhật id (primary key) như mongoose (không đổi được objectId), buộc phải chặn đổi id
     * Mặc dù thông thường ta sẽ update thông qua data ở DTO và lúc đó sẽ exclude data ra (hoặc không định nghĩa nên sẽ bị loại bỏ)
     * Tuy nhiên một số trường hợp update gửi all lên mà không check dto (như update kahoot kèm ảnh từng làm, convert xong k lọc qua dto) dẫn đến kèm id trong hàm update
     */
    // C1: remove id
    // if (data.id) {
    //   delete data.id;
    // }
    // await this.repository.update(id, data as any);
    // return this.findById(id);

    // C2: change id in dataUpdate
    await this.repository.update(id, { ...data, id } as any); // tsconfig.json check kỹ thì phải as any. (có thể gán data.id = id rồi truyền vào hàm update cũng được)
    return this.findById(id);
  }

  softDelete(id: EntityId): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }

  permanentDelete(id: EntityId): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
