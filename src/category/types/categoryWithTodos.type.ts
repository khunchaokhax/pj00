import { Category } from "../entitys/category";
import { todoModified } from "./todoModified.type";


export interface CategoryWithTodos extends Omit<Category, 'todos'> {
    todos: todoModified[];
}
