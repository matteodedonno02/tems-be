import { Injectable } from "@nestjs/common";
import { DataSource, DeleteResult, Repository } from "typeorm";
import { TokenService } from "./token.service";
import { Article } from "../models/article.entity";

@Injectable()
export class ArticleService {
  private articleRepo: Repository<Article>;

  constructor(
    private dataSource: DataSource,
    private tokenService: TokenService
  ) {
    this.articleRepo = dataSource.getRepository(Article);
  }

  async saveOrUpdate(article: Article): Promise<Article> {
    return await this.articleRepo.save(article);
  }

  async delete(article: Article): Promise<DeleteResult> {
    return await this.articleRepo.delete(article);
  }

  async findAll(): Promise<Article[]> {
    return await this.articleRepo.find();
  }

  async findEnabled(): Promise<Article[]> {
    return await this.articleRepo.createQueryBuilder().where("disabled = false").getMany();
  }

  async findByName(name: string): Promise<Article[]> {
    return await this.articleRepo.createQueryBuilder().where("name =:name", { name }).getMany();
  }

  async findById(id: number): Promise<Article> {
    return await this.articleRepo.createQueryBuilder().where("id = :id", { id }).getOne();
  }
}
