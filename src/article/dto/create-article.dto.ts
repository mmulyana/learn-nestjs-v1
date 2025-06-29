import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsUUID,
  IsOptional,
} from 'class-validator';
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
  @IsOptional()
  categoryId: string;

  @IsOptional()
  tags?: string[];
}
