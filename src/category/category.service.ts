import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entitys/category';
import { TodoService } from 'src/todo/todo.service';
import { Repository } from 'typeorm';
import { loadavg } from 'os';


@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category)
    private categoryRepository: Repository<Category>,
        private todoService: TodoService
    ) {

    }

    async getCategoryWithTodos(
        categoryId,
    ) {
        const query = this.categoryRepository.createQueryBuilder('category')
        query.where('category.categoryId = :categoryId', { categoryId })
        query.leftJoinAndSelect('category.todos', 'todo')
        const category = await query.getOne()
        return category
    }

    async findAll() {
        const res = await this.categoryRepository.find()
        return res
    }

    async findOne(value) {
        const res = await this.categoryRepository.findOne({
            categoryId: value
        })
        return res
    }

    async findOneById(value, lastname) {
        const query = this.categoryRepository.createQueryBuilder('category')
        query.where('category.id = :value',
            {
                value
            })
        const q = query.getQuery()
        console.log(q);

        const res = await query.getOne()
        return res
    }

    async createCategory(
        categoryName
    ) {
        const category = this.categoryRepository.create()
        category.categoryName = categoryName
        await this.categoryRepository.save(category)
    }

    async addTodoToCategory(todoId, categoryId) {
        const todo = await this.todoService.findOne(todoId)
        const category = await this.getCategoryWithTodos(categoryId)
        category.todos.push(todo);
        await this.categoryRepository.save(category)
        return
    }

    async deleteTodoTocategory(todoId, categoryId) {
        const todo = await this.todoService.findOne(todoId)
        const category = await this.getCategoryWithTodos(categoryId)
        // category.todos.push(todo);
        // await this.categoryRepository.delete(category)
        // return
        category.todos = category.todos.filter((todo) => {
            if (todo.id === todoId) {
                return false
            } else {
                return true
            }
        })
        await this.categoryRepository.save(category)
        return

    }

    async deleteCategory(
        categoryId: string
    ) {
        const category = await this.categoryRepository.findOne(categoryId)
        await this.categoryRepository.delete(category)
    }
}
