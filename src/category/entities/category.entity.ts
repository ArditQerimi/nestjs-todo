import { Todo } from '../../todo/entities/todo.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  category: string;

  

  //   @Column({nullable:false})
  //   todoId:number

  @ManyToMany(() => Todo, (todo) => todo.categories, { eager: false })
  todos?: Todo[];
}
