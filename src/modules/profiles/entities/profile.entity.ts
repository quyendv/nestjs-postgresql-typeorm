import { User } from '@modules/users/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  gender: string;

  @Column()
  photo: string;

  @OneToOne(() => User, (user) => user.profile) // specify inverse side as a second parameter
  user: User;
}
