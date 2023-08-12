import { Category } from '@modules/categories/entities/category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(@InjectRepository(Question) private readonly questionRepository: Repository<Question>) {}

  async createQuestion() {
    const category1 = new Category();
    category1.name = 'animals';

    const category2 = new Category();
    category2.name = 'zoo';

    const question = new Question();
    question.title = 'dogs';
    question.text = 'who let the dogs out?';
    question.categories = [category1, category2];
    return await this.questionRepository.save(question);
  }

  async findAll() {
    return this.questionRepository.find({
      relations: ['categories'],
    });
  }
}
