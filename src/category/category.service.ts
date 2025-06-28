import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private CategoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = this.CategoryRepository.create(createCategoryDto);
    return await this.CategoryRepository.save(newCategory);
  }

  async findAll(): Promise<Category[]> {
    return await this.CategoryRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    return await this.CategoryRepository.findOneByOrFail({ id });
  }

  async update(
    category: Category,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const updatedCategory = Object.assign(category, updateCategoryDto);
    return await this.CategoryRepository.save(updatedCategory);
  }

  async remove(id: string): Promise<void> {
    await this.CategoryRepository.delete(id);
  }
}
