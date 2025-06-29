import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { createArticleDto } from './dto/create-article.dto';
import { updateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Tag } from 'src/tag/entities/tag.entity';
import { ArticleTag } from 'src/articleTag/entities/article-tag.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Tag)
    private TagRepository: Repository<Tag>,

    @InjectRepository(ArticleTag)
    private ArticleTagRepository: Repository<ArticleTag>,

    @InjectRepository(Article)
    private ArticleRepository: Repository<Article>,
    private CloudinaryService: CloudinaryService,
  ) {}

  async create(
    userId: string,
    payload: createArticleDto,
    file?: Express.Multer.File,
  ): Promise<Article> {
    console.log('Payload:', payload);

    let image: string | undefined;

    if (file) {
      image = await this.CloudinaryService.UploadImageStream(file);
    }

    const article = this.ArticleRepository.create({
      ...payload,
      image,
      userId,
    });

    await this.ArticleRepository.save(article);

    if (payload.tags) {
      for (const tagName of payload.tags) {
        let tag = await this.TagRepository.findOne({
          where: { name: tagName.toLowerCase() },
        });

        if (!tag) {
          tag = this.TagRepository.create({ name: tagName.toLowerCase() });
          await this.TagRepository.save(tag);
        }

        const articleTag = this.ArticleTagRepository.create({ tag, article });
        await this.ArticleTagRepository.save(articleTag);
      }
    }
    return article;
  }

  async readAll(): Promise<Article[]> {
    return await this.ArticleRepository.find({
      relations: ['articleTags', 'articleTags.tag', 'category', 'user'],
      select: {
        articleTags: {
          id: true,
          tag: {
            name: true
          }
        }
      }
    });
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
