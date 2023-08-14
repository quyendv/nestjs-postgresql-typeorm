import { BaseEntity } from '@modules/base/a.base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class BaseTestEntity extends BaseEntity {
  @Column()
  someKey: string;
}
