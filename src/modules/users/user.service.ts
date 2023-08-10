import { Profile } from '@modules/profiles/entities/profile.entity';
import { Injectable } from '@nestjs/common';
import { DeepPartial, DeleteResult, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  create(userData: DeepPartial<User>): Promise<User> {
    const profile = new Profile();
    profile.gender = 'male';
    profile.photo = 'me.jpg';
    const newUser = new User();
    newUser.name = 'Joe Smith';
    newUser.profile = profile;
    return this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
