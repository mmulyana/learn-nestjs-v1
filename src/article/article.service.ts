import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { createArticleDto } from './dto/create-article.dto';
import { updateArticleDto } from './dto/update-article.dto';
import { IArticle } from './interface/article.interface';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private ArticleRepository: Repository<Article>,
  ) {}

  async create(payload: createArticleDto): Promise<Article> {
    const article = await this.ArticleRepository.save(payload);
    return article;
  }

  async readAll(): Promise<Article[]> {
    return await this.ArticleRepository.find();
  }

  async read(id: string): Promise<Article | null> {
    return await this.ArticleRepository.findOne({ where: { id } });
  }

  async update(
    article: Article,
    updateArticleDto: updateArticleDto,
  ): Promise<Article> {
    Object.assign(article, updateArticleDto);
    return await this.ArticleRepository.save(article);
  }

  async destroy(data: Article): Promise<void> {
    await this.ArticleRepository.delete(data.id);
  }
}
