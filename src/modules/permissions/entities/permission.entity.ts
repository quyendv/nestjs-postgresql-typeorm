import { User } from '@modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum PermissionLevels {
  NO,
  LOW,
  MEDIUM,
  HIGH,
  HIGHEST,
}

export enum PermissionActions {
  CREATE,
  READ,
  UPDATE,
  DELETE,
}

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: PermissionLevels, default: PermissionLevels.NO })
  level: number;

  @Column({ type: 'enum', enum: PermissionActions })
  action: number;

  @ManyToOne(() => User, (user) => user.permissions)
  @JoinColumn() // optional in ManyToOne, but required in OneToOne, can reference multiple columns, see more: https://typeorm.io/relations#joincolumn-options
  user: User;
}
