import { Category } from '@modules/categories/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToMany(() => Category, (category) => category.questions, {
    cascade: true, // giúp tạo và xóa relation chỉ bằng .save()
  })
  @JoinTable({
    name: 'question_categories', // default: question_categories_category (do lấy question.categories và category)
    joinColumn: {
      name: 'question', // default: questionId
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category', // default: categoryId
      referencedColumnName: 'id',
    },
  }) // chỉ xuất hiện ở 1 phía (nên ưu tiên đặt ở bên nào quan trọng hơn, thao tác nhiều) -> không tồn tại mảng này trong db nhưng vẫn thao tác với mảng dễ dàng thêm sửa xóa.
  categories: Category[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
