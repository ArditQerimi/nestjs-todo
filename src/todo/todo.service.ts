import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Category } from 'src/category/entities/category.entity';
import { SigninDto } from 'src/common/dtos/auth.dto';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepo: Repository<Todo>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    private readonly usersService: AuthService,
  ) {}

  async createTodo(
    { email }: SigninDto,
    createTodoDto: CreateTodoDto,
  ): Promise<CreateTodoDto> {
    const { todo,  } = createTodoDto;
    let foundedUser: User = await this.repository.findOne({
      where: { email: email },
    });
    const user = { email: foundedUser.email, id: foundedUser.id };
    const newTodo: Todo = this.todoRepo.create({
      todo,
      user,
    });

    console.log(newTodo);

    return await this.todoRepo.save(newTodo);

    // return toTodoDto(todo);
  }

  async findAll(user): Promise<Todo[]> {
    const todos = await this.todoRepo.find({
      where: {
        userId: user.id,
      },
      loadRelationIds: true,
      relations: ['user'],
    });
    return todos;
    // const foundedTodos: Todo[] = todos.filter((user) => user === userId.id);
    // return foundedTodos;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
