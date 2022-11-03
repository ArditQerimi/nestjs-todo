import { Category } from '../../category/entities/category.entity';
import { User } from 'src/common/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  todo?: string;

  //   @Column({nullable: false})
  //   categoryId: number;

  //   @Column()
  //   category: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.todos, {
    cascade: true,
  })
  @JoinColumn()
  user: User;

  @ManyToMany(() => Category, (category) => category.todos, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  categories: Category[];
}
