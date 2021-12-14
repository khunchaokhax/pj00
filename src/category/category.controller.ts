import { Controller, Body, Post, Put, Query, Param, Get, Delete } from '@nestjs/common';
import { get } from 'http';
import { identity } from 'rxjs';
import { Todo } from 'src/todo/entitys/todo';
import { TodoService } from 'src/todo/todo.service';
import { CategoryService } from './category.service';
import { Category } from './entitys/category';
import { CategoryWithTodos } from './types/categoryWithTodos.type';
import { todoModified } from './types/todoModified.type';

@Controller('category')
export class CategoryController {
    constructor(
        private categoryService: CategoryService
    ) {

    }

    @Post('')
    async createCategory(
        @Body('categoryName')
        categoryName: string,

    ) {
        await this.categoryService.createCategory(categoryName)
        return
    }

    @Get()
    async getAll() {
        const category = await this.categoryService.findAll()
        return category
    }

    @Get(':categoryId')
    async getOne(
        @Param('categoryId')
        categoryId: string
    ) {
        const categorys = await this.categoryService.findOne(categoryId)
        return categorys
    }

    @Put(':categoryId/todo')
    async addTodoToCategory(
        @Body('todoId')
        todoId,
        @Param('categoryId')
        categoryId,
        @Query('mode')
        mode
    ) {
        if (mode === 'in') {
            await this.categoryService.addTodoToCategory(todoId, categoryId)
        } else if (mode === 'out') {
            await this.categoryService.deleteTodoTocategory(todoId, categoryId)
        }
        return;

    }

    @Delete(':category')
    async deleteCategory(
        @Param('categoryId')
        categoryId,
    ) {
        await this.categoryService.deleteCategory(categoryId)
        return 'ลบข้อมูลเรียบร้อยแล้ว'
    }

    @Put(':categoryId')
    async updateCategory(
        @Param('categoryId')
        categoryId,
        @Body('categoryName')
        categoryName
    ) {
        await this.categoryService.updateCategory(categoryId, categoryName)
        return 'อัพเดทแล้ว'
    }

    // @Get(':categoryId/todo')
    // async getMany(
    //     @Param('categoryId')
    //     categoryId,
    //     @Body('todoId')
    //     todoId,
    //     @Query('todo')
    //     todo
    // ) {
    //     if (todo === 'id') {
    //         await this.categoryService.getMany(todoId)
    //     }
    //     const category = await this.categoryService.getMany(categoryId)
    //     // category.todos = category.todos.map((todo) => {
    //     //     todo.todoName = todo.name + " " + todo.lastname;
    //     //     return todo
    //     // })
    //     return category
    // }

    @Get(':categoryId/todo')
    async getOneWithTodo(
        @Param('categoryId')
        categoryId,
    ): Promise<CategoryWithTodos> {
        const category = await this.categoryService.getOneWithTodo(categoryId)
        const categoryRet: CategoryWithTodos = {
            categoryId: category.categoryId,
            categoryName: category.categoryName,
            todos: category.todos.map((todo) => {
                // todo.todoName = todo.name + " " + todo.lastname
                const todoMo: todoModified = {
                    todoId: todo.id,
                    todoName: todo.name + " " + todo.lastname
                }
                return todoMo
            })
        }
        return categoryRet
    }

    @Put(':categoryId/all')
    async updateTodoWithCatrgory(
        @Param('categoryId')
        categoryId,
        @Body('categoryName')
        categoryName,
        @Body('todos')
        todos: string[],
    ) {
        // console.log(categoryId, categoryName, todos);
        await this.categoryService.updateTodoWithCatrgory(categoryId, categoryName, todos)
        console.log(categoryId, categoryName, todos);
        return;
    }

}

