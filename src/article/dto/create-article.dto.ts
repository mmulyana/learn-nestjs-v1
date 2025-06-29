import { IsNotEmpty, IsString, IsEnum, IsUUID } from 'class-validator';
import { ArticleStatus } from '../interface/article.interface';
import { Optional } from '@nestjs/common';
export class createArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsEnum(ArticleStatus)
  status: ArticleStatus;

  @IsUUID()
  @Optional()
  categoryId: string;

  
}
