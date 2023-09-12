import { DeepPartial, DeleteResult, FindManyOptions, FindOneOptions, UpdateResult } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';

export interface IBaseService<T> {
  createOne(data: DeepPartial<T>): Promise<T>;

  createMany(data: DeepPartial<T>[]): Promise<T[]>;

  findById(id: EntityId, options?: FindOneOptions<T>): Promise<T | null>;

  findByIds(ids: EntityId[], options?: FindOneOptions<T>): Promise<T[]>;

  findOneWithOptions(options: FindOneOptions<T>): Promise<T | null>;

  findAll(options?: FindManyOptions<T>): Promise<T[]>;

  updateOne(id: EntityId, data: DeepPartial<T>): Promise<T | null>;

  softDelete(id: EntityId): Promise<UpdateResult>;

  restore(id: EntityId): Promise<UpdateResult>;

  permanentDelete(id: EntityId): Promise<DeleteResult>;

  // Special
  findOneOrCreate(data: DeepPartial<T>, options?: FindOneOptions<T>): Promise<T>;
}
