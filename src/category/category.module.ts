import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TodoModule } from 'src/todo/todo.module';
import { Category } from './entitys/category';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    TodoModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule { }
