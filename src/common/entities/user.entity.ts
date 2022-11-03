import { Exclude } from 'class-transformer';
import { Todo } from 'src/todo/entities/todo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  // @Column({ default: true })
  // isAdmin: boolean;
  @Column()
  isAdmin: boolean;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
