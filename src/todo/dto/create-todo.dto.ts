import { IsString } from 'class-validator';
import { TaskDto } from './task.dto';

export class CreateTodoDto {
  @IsString()
  todo?: string;

  categoryId?: number[];

  userId?:any

  tasks?: TaskDto[];
}
