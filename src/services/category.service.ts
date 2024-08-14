import { Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Category } from '../models/category.entity';
import { FileService } from './file.service';
import { File } from 'src/models/file.entity';

@Injectable()
export class CategoryService {
  private categoryRepo: Repository<Category>;

  constructor(
    private dataSource: DataSource,
    private fileService: FileService,
  ) {
    this.categoryRepo = dataSource.getRepository(Category);
  }

  async save(file: Express.Multer.File, category: Category) {
    if (file != null) {
      category.image = await this.fileService.saveFile(file);
    }
    return await this.categoryRepo.save(category);
  }

  async update(file: Express.Multer.File, category: Category): Promise<UpdateResult> {
    if (file) {
      category.image = await this.fileService.saveFile(file)
    }
    delete category.articles
    return await this.categoryRepo.update({ idCategory: category.idCategory }, category)
  }


  async delete(idCategory: number): Promise<DeleteResult> {
    const existingCategory = await this.categoryRepo.findOne({
      where: {
        idCategory,
      },
      relations: {
        image: true,
      },
    })

    if (existingCategory) {
      return await this.dataSource.transaction(async (entityManager) => {
        await this.fileService.deleteFile(existingCategory.image)
        return await entityManager.delete(Category, {
          idCategory: existingCategory.idCategory
        })
      })
    }
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepo.find({ relations: { articles: true } });
  }

  async findEnabled(): Promise<Category[]> {
    return await this.categoryRepo
      .createQueryBuilder('category')
      .where('category.disabled = false')
      .leftJoinAndSelect('category.articles', 'article')
      .getMany();
  }

  async findByName(name: string): Promise<Category[]> {
    return await this.categoryRepo
      .createQueryBuilder('category')
      .where('category.name =:name', { name })
      .leftJoinAndSelect('category.articles', 'article')
      .getMany();
  }

  async findById(idCategory: number): Promise<Category> {
    return await this.categoryRepo
      .createQueryBuilder('category')
      .where('category.idCategory = :idCategory', { idCategory })
      .leftJoinAndSelect('category.articles', 'article')
      .getOne();
  }

  async getPaged(skip: number, limit: number, searchterm?: string) {
    let query = await this.categoryRepo.createQueryBuilder('category');

    if (searchterm) {
      const lowercasedSearchTerm = `%${searchterm.toLowerCase()}%`;
      query = query.where('LOWER(category.name) LIKE :searchTerm', { searchTerm: lowercasedSearchTerm });
    }

    return await query.skip(skip).take(limit).getMany();
  }

  async getFile(idCategory: number) {
    const category = await this.categoryRepo.findOne({
      where: { idCategory },
      relations: {
        image: true
      }
    })

    return category?.image
  }
}
