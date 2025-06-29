import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ArticleTag } from 'src/articleTag/entities/article-tag.entity';
import { Article } from './entities/article.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Tag, ArticleTag]), JwtModule],
  controllers: [ArticleController],
  providers: [ArticleService, CloudinaryService],
})
export class ArticleModule {}
