import { Profile } from '@modules/profiles/entities/profile.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') // default no option: number increment
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true }) // specify inverse side as a second parameter
  @JoinColumn()
  profile: Profile;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }) // default no option is timestamp
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }) // when you change the timezone of your database server, the TIMESTAMP value stored in the database will not change automatically. (it mean TIMESTAMPTZ automatic...?)
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' }) // no default
  deletedAt: Date;
}
