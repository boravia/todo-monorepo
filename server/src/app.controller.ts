import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllTodos() {
    return this.appService.getAllTodos();
  }

  @Post()
  createTodo(@Body('title') title: string) {
    return this.appService.createTodo(title);
  }

  @Patch(':id')
  toggleTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body('completed') completed: boolean,
  ) {
    return this.appService.toggleTodo(completed, id);
  }

  @Delete(':id')
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.appService.deleteTodo(id);
  }
}
