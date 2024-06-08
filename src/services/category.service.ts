import { Injectable } from "@nestjs/common";
import { DataSource, DeleteResult, Repository } from "typeorm";
import { TokenService } from "./token.service";
import { Category } from "../models/category.entity";

@Injectable()
export class CategoryService {
  private categoryRepo: Repository<Category>;

  constructor(
    private dataSource: DataSource,
    private tokenService: TokenService
  ) {
    this.categoryRepo = dataSource.getRepository(Category);
  }

  async saveOrUpdate(category: Category): Promise<Category> {
    return await this.categoryRepo.save(category);
  }

  async delete(category: Category): Promise<DeleteResult> {
    return await this.categoryRepo.delete(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepo.find();
  }

  async findEnabled(): Promise<Category[]> {
    return await this.categoryRepo.createQueryBuilder().where("disabled = false").getMany();
  }

  async findByName(name: string): Promise<Category[]> {
    return await this.categoryRepo.createQueryBuilder().where("name =:name", { name }).getMany();
  }

  async findById(id: number): Promise<Category> {
    return await this.categoryRepo.createQueryBuilder().where("id = :id", { id }).getOne();
  }
}
