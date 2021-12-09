import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "src/category/entitys/category";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string

    @ManyToOne(() => Category, category => category.todos)
    category: Category

}