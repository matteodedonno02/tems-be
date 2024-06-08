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

  async delete(idArticle: number): Promise<DeleteResult> {
    return await this.articleRepo.delete(idArticle);
  }

  async findAll(): Promise<Article[]> {
    return await this.articleRepo.find({relations: {categories:true}});
  }

  async findEnabled(): Promise<Article[]> {
    return await this.articleRepo.createQueryBuilder("article").where("article.disabled = false").leftJoinAndSelect("article.categories", "category").getMany();
  }

  async findByName(name: string): Promise<Article[]> {
    return await this.articleRepo.createQueryBuilder("article").where("article.name =:name", { name }).leftJoinAndSelect("article.categories", "category").getMany();
  }

  async findById(idArticle: number): Promise<Article> {
    return await this.articleRepo.createQueryBuilder("article").where("article.idArticle = :idArticle", { idArticle }).leftJoinAndSelect("article.categories", "category").getOne();
  }
}
