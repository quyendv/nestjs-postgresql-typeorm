import { Profile } from '@modules/profiles/entities/profile.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, DeleteResult, Repository } from 'typeorm';
import { User } from './entities/user.entity';

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
    return this.userRepository.find({
      loadRelationIds: true, // true nếu lấy ra id của profile trong user (mặc định k có), nếu bật relation thì cái này k quan trọng => Trong db là cột 'profileId' nhưng result lại là 'profile'
      // where: { id: 1 },
      // where: { id: In([1, 2, 3, 4, 5]), name: 'Joe Smith', profile: { gender: 'male' } }, // AND
      where: [
        // OR each conditionObj
        { name: 'Joe Smith' },
        { name: 'Joe Smith1' },
      ],
      select: ['id', 'name', 'profile'],
      // relations: ['profile'],
      relations: { profile: true },
    });
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
