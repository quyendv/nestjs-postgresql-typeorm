import { Permission } from '@modules/permissions/entities/permission.entity';
import { Profile } from '@modules/profiles/entities/profile.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
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
  @JoinColumn({
    // name: 'profile_id', // default is profileId column in db
    // referencedColumnName: 'id', // default referenced column id (PrimaryGeneratedColumn)
  })
  profile: Profile;

  // *** Version1: User1 có quyền A, B, C; User2 cũng có quyền A, B, C -> Tuy nhiên làm như hiện tại thì mỗi quyền A của từng user sẽ là các bản ghi riêng biệt -> thừa dữ liệu -> chuyển sang ManyToMany
  @OneToMany(() => Permission, (permission) => permission.user, { cascade: true })
  permissions: Permission[]; // here each user has many permissions, and each permission only belongs to one user -> OPTIMIZE: many user has same permissions, avoid duplicates permissions records

  // *** Version2:
  // Không dùng quan hệ: Tận dụng khả năng lưu trữ mảng của postgres ta sẽ lưu dạng array các Permission luôn (có điều mỗi khi cập nhật thêm sửa lại có phần khó, lưu mảng các phần tử - embedding thì hơi to, mà lưu id thì k biết relation kiểu gì khi nó không phải quan hệ). Chú ý: Typeorm có hỗ trợ tạo entity chứa dạng 'simple-array' tuy nhiên bản chất cột đó sẽ thành kiểu string và các phần tử cách nhau bởi dấu ',' dẫn đến element tuyệt đối không được có dấu ','. Ngược lại Postgres có chức năng lưu mảng thực sự với kiểu 'array' -> Xem thêm: https://wanago.io/2020/11/02/api-nestjs-array-data-type-postgresql-typeorm/
  // ManyToMany theo cách thông thường của sql (MySql, ...) sẽ tạo bảng mới mapping 2 bảng này lại -> chọn cách này

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }) // default no option is timestamp
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }) // when you change the timezone of your database server, the TIMESTAMP value stored in the database will not change automatically. (it mean TIMESTAMPTZ automatic...?)
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' }) // no default
  deletedAt: Date;
}
