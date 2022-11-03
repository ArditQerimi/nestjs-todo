import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '../todo/entities/todo.entity';
import { getEnabledCategories } from 'trace_events';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { User } from 'src/common/entities/user.entity';
import { SigninDto } from 'src/common/dtos/auth.dto';

@Injectable()
export class CategoryService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Todo)
    private readonly todoRepo: Repository<Todo>,
  ) {}

  async create(
    { email }: SigninDto,
    createCategoryDto: CreateCategoryDto,
  ): Promise<CreateCategoryDto> {
    let foundedUser: User = await this.repository.findOne({
      where: { email: email },
    });
    const user = { email: foundedUser.email, id: foundedUser.id };

    const userId = user.id;
    const { category } = createCategoryDto;

    // const task = this.todoRepo.create({todo: "sleep", userId });
    // await this.todoRepo.save(task);

    const categoryRepo = this.categoryRepo.create({
      category,
    });
    // categoryRepo.todos = [task];

    return await this.categoryRepo.save(categoryRepo);
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
