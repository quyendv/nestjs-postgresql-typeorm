import { Column, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from 'typeorm';

// Tự xem table, k rõ nó build kiểu gì, nhưng nhược điểm là chỉ có 1 root duy nhất, thêm bất cứ 1 bản ghi nào đều phải là con của những bản ghi đã có
// Tự đọc thêm cách xây dựng thuật toán và visualize: https://wiki.easyvista.com/xwiki/bin/view/Documentation/Tips%20and%20Tricks/Nested%20sets/
@Entity()
@Tree('nested-set')
export class TreeNested {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @TreeChildren()
  children: TreeNested[];

  @TreeParent()
  parent: TreeNested;
}
