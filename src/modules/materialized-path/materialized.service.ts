import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { MaterializedPath } from './entities/materialized.entity';

@Injectable()
export class MaterializedPathService {
  constructor(
    @InjectRepository(MaterializedPath) private readonly repository: Repository<MaterializedPath>,
    @InjectRepository(MaterializedPath) private readonly tree: TreeRepository<MaterializedPath>,
  ) {}

  async create() {
    const tree1 = new MaterializedPath();
    tree1.name = 'MaterializedPath 1';
    await this.repository.save(tree1);

    const tree11 = this.repository.create({ name: 'MaterializedPath 11', parent: tree1 });
    await this.repository.save(tree11);
    const tree12 = this.repository.create({ name: 'MaterializedPath 12', parent: tree1 });
    await this.repository.save(tree12);

    const tree111 = this.repository.create({ name: 'MaterializedPath 111', parent: tree11 });
    await this.repository.save(tree111);
    const tree112 = this.repository.create({ name: 'MaterializedPath 112', parent: tree11 });
    await this.repository.save(tree112);
    return tree1;
  }

  async findAll() {
    return this.tree.findTrees();
  }
}
