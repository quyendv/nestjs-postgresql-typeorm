import { Column, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from 'typeorm';

// Một kiểu cũng khá hay, table sẽ lưu trữ path từ root đến nó
@Entity()
@Tree('materialized-path')
export class MaterializedPath {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @TreeChildren()
  children: MaterializedPath[];

  @TreeParent()
  parent: MaterializedPath;
}
