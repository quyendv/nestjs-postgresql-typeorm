import { Column, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from 'typeorm';

// Cách này thay vì phải lưu self-referencing như adjacency list, thì sẽ tạo 1 bảng chứa 2 cột ancestor_id và descendant_id để lưu cây -> truy vấn nhiều cấp thay vì chỉ đc 1 cấp như thông thường (hoặc truy vấn đệ quy để lấy nhiều)
// closure-table (table gốc 'employee' vẫn có cột 'parentId') và self-referencing là 2 loại phổ biến nhất, materialized-path cũng được đánh giá cao, nested-set hơi khó hiểu và khó dùng (chỉ có 1 root duy nhất nữa)
@Entity()
@Tree('closure-table') // custom options: https://typeorm.io/tree-entities#closure-table
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @TreeChildren()
  children: Employee[];

  @TreeParent()
  parent: Employee;
}
