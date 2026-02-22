import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async getAllTodos(): Promise<TodoEntity[]> {
    return this.todoRepository.find({
      order: { id: 'ASC' },
    });
  }

  async createTodo(title: string) {
    const newTodo = this.todoRepository.create({ title });
    return this.todoRepository.save(newTodo);
  }

  async toggleTodo(completed: boolean, id: number) {
    await this.todoRepository.update(id, { completed });
    return this.todoRepository.findOneBy({ id });
  }

  async deleteTodo(id: number) {
    await this.todoRepository.delete(id);
  }
}
