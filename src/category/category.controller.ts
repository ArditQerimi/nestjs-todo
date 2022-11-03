import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CheckAbilities } from 'src/casl/ability.decorator';
import { AbilitiesGuard } from 'src/casl/ability.guard';
import { Action } from 'src/casl/casl-ability.factory';
import { SigninDto } from 'src/common/dtos/auth.dto';
import { User } from 'src/common/entities/user.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // @Post()
  // async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
  //   return await this.categoryService.create(createCategoryDto);
  // }

  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @CheckAbilities({ action: Action.Create, subject: User })
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() req: any,
  ): Promise<CreateCategoryDto> {
    const user = req.user as SigninDto;
    return await this.categoryService.create(user,createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
