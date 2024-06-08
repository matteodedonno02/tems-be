import { Body, Controller, Get, Post } from "@nestjs/common";
import { ArticleService } from "../services/article.service";
import { Article } from "../models/article.entity";
import {SAVE_OR_UPDATE, DELETE, FIND_ALL, FIND_ENABLED, FIND_BY_NAME, FIND_BY_ID} from "../util/rooting-constants"


@Controller('article')
export class ArticleController {

  constructor(
    private articleService: ArticleService
  ) {
  }

  @Post(SAVE_OR_UPDATE)
  async saveOrUpdate(@Body('article') article: Article) {
    return await this.articleService.saveOrUpdate(article)
  }

  @Post(DELETE)
  async delete(@Body('article') article: Article) {
    return await this.articleService.delete(article)
  }

  @Get(FIND_ALL)
  async findAll() {
    return await this.articleService.findAll()
  }
  @Get(FIND_ENABLED)
  async findEnabled() {
    return await this.articleService.findEnabled()
  }

  @Get(FIND_BY_NAME)
  async findByName(@Body('name') name: string): Promise<Article[]> {
    return await this.articleService.findByName(name)
  }

  @Get(FIND_BY_ID)
  async findById(@Body('id') id: number): Promise<Article> {
    return await this.articleService.findById(id)
  }
}
