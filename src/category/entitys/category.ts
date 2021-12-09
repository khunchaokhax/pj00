import { Todo } from "src/todo/entitys/todo";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    categoryId: number;

    @Column()
    categoryName: string;

    @OneToMany(() => Todo, todo => todo.category)
    todos: Todo[];
}
