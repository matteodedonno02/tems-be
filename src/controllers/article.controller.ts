import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ArticleService } from "../services/article.service";
import { Article } from "../models/article.entity";
import {
  SAVE_OR_UPDATE,
  DELETE,
  FIND_ALL,
  FIND_ENABLED,
  FIND_BY_NAME,
  FIND_BY_ID,
  AUTH
} from "../util/routing-constants";


@Controller('article')
export class ArticleController {

  constructor(
    private articleService: ArticleService
  ) {
  }

  @Post(`${AUTH}/${SAVE_OR_UPDATE}`)
  async saveOrUpdate(@Body() article: Article) {
    return await this.articleService.saveOrUpdate(article)
  }

  @Post(`${AUTH}/${DELETE}`)
  async delete(@Body('idArticle') idArticle: number) {
    return await this.articleService.delete(idArticle)
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
  async findById(@Param('id') idArticle: number): Promise<Article> {
    return await this.articleService.findById(idArticle)
  }
}
