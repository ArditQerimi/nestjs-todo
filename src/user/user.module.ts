import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Todo } from 'src/todo/entities/todo.entity';
import { User } from '../common/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Todo]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
