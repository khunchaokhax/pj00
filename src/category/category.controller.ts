import { Controller, Body, Post, Put, Query, Param, Get, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entitys/category';

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
}
