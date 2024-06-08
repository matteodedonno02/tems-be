import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/models/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  exports: [TypeOrmModule]
})
export class ArticleModule {}
