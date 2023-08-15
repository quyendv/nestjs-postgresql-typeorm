import { BaseEntity } from '@modules/base/a.base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'base-test' })
export class BaseTestEntity extends BaseEntity {
  @Column()
  someKey: string;
}
