import { Profile } from '@modules/profiles/entities/profile.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true }) // specify inverse side as a second parameter
  @JoinColumn()
  profile: Profile;
}
