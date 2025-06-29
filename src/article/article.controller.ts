import { FileInterceptor } from '@nestjs/platform-express'
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
  Request,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { createArticleDto } from './dto/create-article.dto';
import { updateArticleDto } from './dto/update-article.dto';
import { FindOneParams } from './dto/find-one.params';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Article } from './entities/article.entity';
import { ArticleService } from './article.service';

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

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async post(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: createArticleDto,
  ): Promise<Article> {
    return await this.service.create(req.user.id, body, file);
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
