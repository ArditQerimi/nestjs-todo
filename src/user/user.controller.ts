import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from 'src/common/dtos/auth.dto';
import { AddTodo } from 'src/common/dtos/crud.dto';
// import { UserSignupDto } from 'src/common/dtos/user.dto';
import { User } from 'src/common/entities/user.entity';

@Controller('user')
export class UserController {
  @Post('addpost')
  async addPost(@Body() addTodo: AddTodo) {}
}
