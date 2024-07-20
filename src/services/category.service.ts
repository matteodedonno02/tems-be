import { Injectable } from "@nestjs/common";
import { DataSource, DeleteResult, Repository } from "typeorm";
import { Category } from "../models/category.entity";

@Injectable()
export class CategoryService {
  private categoryRepo: Repository<Category>;

  constructor(
    private dataSource: DataSource
  ) {
    this.categoryRepo = dataSource.getRepository(Category);
  }

  async saveOrUpdate(category: Category): Promise<Category> {
    return await this.categoryRepo.save(category);
  }

  async delete(idCategory: number): Promise<DeleteResult> {
    return await this.categoryRepo.delete(idCategory);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepo.find({ relations: { articles: true } });
  }

  async findEnabled(): Promise<Category[]> {
    return await this.categoryRepo.createQueryBuilder("category").where("category.disabled = false").leftJoinAndSelect("category.articles", "article").getMany();
  }

  async findByName(name: string): Promise<Category[]> {
    return await this.categoryRepo.createQueryBuilder("category").where("category.name =:name", { name }).leftJoinAndSelect("category.articles", "article").getMany();
  }

  async findById(idCategory: number): Promise<Category> {
    return await this.categoryRepo.createQueryBuilder("category").where("category.idCategory = :idCategory", { idCategory }).leftJoinAndSelect("category.articles", "article").getOne();
  }

  async getPaged(from: number, to: number) {
    return await this.categoryRepo.find({
      skip: from,
      take: to,
      relations: {
        image: true
      }
    })
  }
}
