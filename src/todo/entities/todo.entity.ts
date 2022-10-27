import { User } from "src/common/entities/user.entity";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, Entity, JoinColumn } from "typeorm";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    todo: string;
  
    @ManyToOne(() => User, (user) => user.todos)
    @JoinColumn()
    user: User;

}
