import { Body, Controller, Get, Post, Param, Put, Delete, Query } from '@nestjs/common';
import { identity } from 'rxjs';
import { Category } from 'src/category/entitys/category';
import { todoModified } from 'src/category/types/todoModified.type';
import { TodoWithCategory } from 'src/category/types/todoWithCategory.type';
import { Todo } from './entitys/todo';
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
        return 'เพิ่ม todo แล้ว'
    }

    // @Get()
    // async getAll() {
    //     const todos = await this.todoService.findAll()
    //     return todos
    // }

    @Get()
    async getTodo(
        @Query('category')
        category
    ): Promise<TodoWithCategory[]> {
        const todos = await this.todoService.getTodo(category)
        // const todosRet: any = [];
        // for (let i = 0; i < todo.length; i++) {
        //     const res = {
        //         id: todo[i].id,
        //         name: todo[i].name,
        //         lastname: todo[i].lastname,
        //         categoryId: todo[i].category.categoryId,
        //         categoryName: todo[i].category.categoryName
        //     }
        //     todosRet.push(res)
        // }
        // return todosRet
        const todosRet = todos.map((todo) => {
            return {
                id: todo.id,
                name: todo.name,
                lastname: todo.lastname,
                categoryId: todo.category.categoryId,
                categoryName: todo.category.categoryName,
            }
        })
        return todosRet
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

