import { Permission, PermissionActions, PermissionLevels } from '@modules/permissions/entities/permission.entity';
import { Profile } from '@modules/profiles/entities/profile.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, DeleteResult, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(userData: DeepPartial<User>): Promise<User> {
    const profile = new Profile();
    profile.gender = 'male';
    profile.photo = 'me.jpg';

    const permission = new Permission();
    permission.level = PermissionLevels.NO;
    permission.action = PermissionActions.READ;

    const newUser = new User();
    newUser.name = 'Joe Smith';
    newUser.profile = profile;
    newUser.permissions = [permission];

    // *** Some api: see more at https://typeorm.io/repository-api and https://typeorm.io/repository-api#additional-options
    // create instances
    // const user1 = this.userRepository.create(); // same as const user = new User();
    // const user2 = this.userRepository.create({ id: 'some-uuid-v4', name: 'hello' }); // same as const user = new User(); user.firstName = "Timber"; user.lastName = "Saw";
    // const userList = this.userRepository.create([
    //   { id: 'key1', name: 'value1' },
    //   { id: 'key2', name: 'value2' },
    //   // ...
    // ]);

    // const insertResult: InsertResult = await this.userRepository.insert({ name: 'hey' });

    // await update(id | conditionObject, updateData)

    // await upsert... like createOrUpdate -> difficult to use, read carefully

    // await repository.remove(user)
    // await repository.remove([category1, category2, category3]);

    // softRemove and recover

    // await delete(id | ids[] | conditionObject)

    // softDelete and restore

    // count, countBy

    // find, findBy, findAndCount, ...

    // sum, average, minimum , maximum, ...

    // query, clear, ...

    // hasId, getId

    // *** Query builder:
    // const test: User[] = await this.userRepository
    //   .createQueryBuilder('user')
    //   .where('user.name = :name', { name: 'John' })
    //   .getMany();

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
      relations: { profile: true, permissions: true },
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
