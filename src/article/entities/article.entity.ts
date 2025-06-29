import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ArticleStatus } from '../interface/article.interface';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/auth/entities/user.entity';
import { ArticleTag } from 'src/articleTag/entities/article-tag.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => Category, (category) => category.articles)
  category: Category;

  @Column({ type: 'uuid', nullable: true })
  categoryId: string;

  @ManyToOne(() => User, (user) => user.articles)
  user: User;

  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @Column({
    type: 'enum',
    enum: ArticleStatus,
    default: ArticleStatus.Pending,
  })
  status: string;

  @OneToMany(() => ArticleTag, (articletag) => articletag.article)
  articleTags: ArticleTag[];

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
