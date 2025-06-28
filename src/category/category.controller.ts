import {
  Put,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Controller,
  NotFoundException,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOneOrFail(id);
    return this.categoryService.update(category, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.findOneOrFail(id);
    return this.categoryService.remove(id);
  }

  private async findOneOrFail(id: string): Promise<Category> {
    const category = await this.categoryService.findOne(id);
    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }
}
