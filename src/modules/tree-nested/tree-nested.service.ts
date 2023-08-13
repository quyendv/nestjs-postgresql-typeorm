import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { TreeNested } from './entities/tree-nested.entity';

@Injectable()
export class TreeNestedService {
  constructor(
    @InjectRepository(TreeNested) private readonly repository: Repository<TreeNested>,
    @InjectRepository(TreeNested) private readonly tree: TreeRepository<TreeNested>,
  ) {}

  async create() {
    const tree1 = new TreeNested();
    tree1.name = 'TreeNested 1';
    await this.repository.save(tree1);

    const tree11 = this.repository.create({ name: 'TreeNested 11', parent: tree1 });
    await this.repository.save(tree11);
    const tree12 = this.repository.create({ name: 'TreeNested 12', parent: tree1 });
    await this.repository.save(tree12);

    const tree111 = this.repository.create({ name: 'TreeNested 111', parent: tree11 });
    await this.repository.save(tree111);
    const tree112 = this.repository.create({ name: 'TreeNested 112', parent: tree11 });
    await this.repository.save(tree112);
    return tree1;
  }

  async findAll() {
    return this.tree.findTrees();
  }
}
