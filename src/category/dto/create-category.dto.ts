import { IsString } from "class-validator";
import { Todo } from "src/todo/entities/todo.entity";

export class CreateCategoryDto {
    @IsString()
    category: string;


    
  
}
