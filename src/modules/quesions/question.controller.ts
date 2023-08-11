import { Controller, Get, Post } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  createQuestion() {
    return this.questionService.createQuestion();
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }
}
