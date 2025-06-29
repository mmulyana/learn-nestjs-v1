import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { createArticleDto } from './dto/create-article.dto';
import { updateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private ArticleRepository: Repository<Article>,
    private CloudinaryService: CloudinaryService,
  ) {}

  async create(
    userId: string,
    payload: createArticleDto,
    file?: Express.Multer.File,
  ): Promise<Article> {
    let image: string | undefined;

    if (file) {
      image = await this.CloudinaryService.UploadImageStream(file);
    }

    const article = this.ArticleRepository.create({
      ...payload,
      image,
      userId,
    });
    return this.ArticleRepository.save(article);
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
