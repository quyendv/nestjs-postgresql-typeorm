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

  /**
   * See more find options: https://typeorm.io/find-options
   */
  findAll(): Promise<User[]> {
    return this.userRepository.find({
      // loadRelationIds: true, // true nếu lấy ra id của profile trong user (mặc định k có), nếu bật cùng relation thì cái này sẽ conflict và chỉ lấy id => Trong db là cột 'profileId' nhưng result lại là 'profile'
      // where: { id: 1 }, // đổi dạng id sang uuid
      // where: { id: In([1, 2, 3, 4, 5]), name: 'Joe Smith', profile: { gender: 'male' } }, // AND -> more advanced option like In: https://typeorm.io/find-options#advanced-options
      // where: [
      //   // OR each conditionObj
      //   { name: 'Joe Smith' },
      //   { name: 'Joe Smith1' },
      // ],
      // select: ['id', 'name', 'profile', 'createdAt', 'updatedAt'], // or object<string, boolean> like relations
      // relations: ['profile'], // không nên bật cùng loadRelationIds
      relations: { profile: true },
      // withDeleted: true, // mặc định là false, không lấy những phần tử softDelete/softRemove, bật true nếu vẫn lấy

      // order: { name: 'ASC', id: 'DESC' },
      // skip: 5, // OFFSET
      // take: 10, // LIMIT
      // cache: true, // cache lifetime mặc định 1s, see more: https://typeorm.io/caching#
    });
  }

  findOne(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  remove(id: string): Promise<DeleteResult> {
    // return this.userRepository.delete(id); // Phân biệt delete (xóa theo id, [id], conditions), remove (xóa theo entity, [entity]): https://stackoverflow.com/questions/54246615/what-s-the-difference-between-remove-and-delete
    return this.userRepository.softDelete(id);
  }
}
