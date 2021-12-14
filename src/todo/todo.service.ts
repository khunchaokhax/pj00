import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { TodoWithCategory } from 'src/category/types/todoWithCategory.type';
import { Connection, Repository } from 'typeorm';
import { Todo } from './entitys/todo';

@Injectable()
export class TodoService {

    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
        @InjectConnection()
        private connecion: Connection
    ) {
    }

    async create(value, value2) {
        const createdTodo = this.todoRepository.create()
        createdTodo.name = value
        createdTodo.lastname = value2
        await this.todoRepository.save(createdTodo)
        return
    }

    async findAll() {
        const res = await this.todoRepository.find()
        return res
    }

    async findOne(value) {
        const res = await this.todoRepository.findOne({
            id: value
        })
        return res
    }

    async findOneByName(value, lastname) {
        const query = this.todoRepository.createQueryBuilder('todo')
        query.where('todo.name = :value',
            {
                value
            })
        query.andWhere('todo.lastname = :lastname', { lastname })
        const q = query.getQuery()
        console.log(q);

        const res = await query.getOne()
        return res
    }

    async updateTodo(
        id: string,
        name: string,
        lastname: string,
    ) {
        const query = this.todoRepository.createQueryBuilder('todo')
        query.where('todo.id = :id', { id });
        const todo = await query.getOne();
        todo.name = name
        todo.lastname = lastname
        await this.todoRepository.save(todo);
        return
    }

    async deleteTodo(
        id: string
    ) {
        const todo = await this.findOne(id)
        await this.todoRepository.delete(todo)
    }

    async CategoryToTodo(id) {
        const query = this.todoRepository.createQueryBuilder('todo')
        query.leftJoinAndSelect('todo.category', 'category')
        query.where("todo.id = :val", { val: id })
        // console.log(query.getQuery());
        const todo = await query.getOne()
        return todo
    }

    async getTodo(id) {
        // const res = await this.todoRepository.findOne({
        //     id: id
        // })
        // return res
        const query = this.todoRepository.createQueryBuilder('todo')
        query.leftJoinAndSelect('todo.category', 'category')
        query.where('category.categoryId = :categoryId', { categoryId: id },)
        return query.getMany()

    }
}
