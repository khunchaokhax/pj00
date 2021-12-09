import { Body, Controller, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { identity } from 'rxjs';
import { Category } from 'src/category/entitys/category';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {

    constructor(
        private todoService: TodoService
    ) {

    }

    @Post()
    async create(
        @Body('name')
        name: string,
        @Body('lastname')
        lastname: string,
    ) {
        console.log(name);

        await this.todoService.create(name, lastname)
        return '1234'
    }

    @Get()
    async getAll() {
        const todos = await this.todoService.findAll()
        return todos
    }

    @Get(':id')
    async getOne(
        @Param('id')
        id: string
    ) {
        const todos = await this.todoService.findOne(id)
        return todos
    }

    @Get('list/name')
    async getOneByName(
        @Body('name')
        name: string,
        @Body('lastname')
        lastname: string
    ) {
        const todos = await this.todoService.findOneByName(name, lastname)
        return todos
    }

    @Put(':id')
    async updateTodo(
        @Param('id')
        id,
        @Body('name')
        name,
        @Body('lastname')
        lastname
    ) {
        await this.todoService.updateTodo(id, name, lastname)
        return 'เรียบร้อยแล้ว'
    }

    @Delete(':id')
    async deleteTodo(
        @Param('id')
        id,
    ) {
        await this.todoService.deleteTodo(id)
        return 'ลบข้อมูลเรียบร้อยแล้ว'
    }

    @Get(':todoId/category')
    async CategoryToTodo(
        @Param('todoId')
        todoId: string
    ) {
        const todo = await this.todoService.CategoryToTodo(todoId)
        return todo
    }
}
