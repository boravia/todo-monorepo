import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5433,
      username: 'todo_user',
      password: 'todo_password',
      database: 'tododb',
      entities: [TodoEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TodoEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
