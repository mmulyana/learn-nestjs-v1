import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { createArticleDto } from './dto/create-article.dto';
import { ArticleService } from './article.service';
import { FindOneParams } from './dto/find-one.params';
import { updateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Controller('articles')
export class ArticleController {
  constructor(private readonly service: ArticleService) {}

  @Get()
  async findAll(): Promise<Article[]> {
    return await this.service.readAll();
  }

  @Get('/:id')
  async findOne(@Param() params: FindOneParams): Promise<Article> {
    return await this.findOneOrFail(params.id);
  }

  @Post()
  async post(@Body() body: createArticleDto): Promise<Article> {
    return await this.service.create(body);
  }

  @Put('/:id')
  async put(@Param() params: FindOneParams, @Body() body: updateArticleDto) {
    const article = await this.findOneOrFail(params.id);

    return this.service.update(article, body);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param() params: FindOneParams) {
    const article = await this.findOneOrFail(params.id);
    return this.service.destroy(article);
  }

  private async findOneOrFail(id: string): Promise<Article> {
    const article = await this.service.read(id);

    if (!article) {
      throw new NotFoundException();
    }

    return article;
  }
}
