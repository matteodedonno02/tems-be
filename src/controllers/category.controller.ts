import { Body, Controller, Get, Post } from "@nestjs/common";
import { CategoryService } from "../services/category.service";
import { Category } from "../models/category.entity";
import {
  SAVE_OR_UPDATE,
  DELETE,
  FIND_ALL,
  FIND_ENABLED,
  FIND_BY_NAME,
  FIND_BY_ID,
  AUTH
} from "../util/routing-constants";


@Controller('category')
export class CategoryController {

  constructor(
    private categoryService: CategoryService
  ) {
  }

  @Post(`${AUTH}/${SAVE_OR_UPDATE}`)
  async saveOrUpdate(@Body() category: Category) {
    return await this.categoryService.saveOrUpdate(category)
  }

  @Post(`${AUTH}/${DELETE}`)
  async delete(@Body('idCategory') idCategory: number) {
    return await this.categoryService.delete(idCategory)
  }

  @Get(FIND_ALL)
  async findAll() {
    return await this.categoryService.findAll()
  }
  @Get(FIND_ENABLED)
  async findEnabled() {
    return await this.categoryService.findEnabled()
  }

  @Get(FIND_BY_NAME)
  async findByName(@Body('name') name: string): Promise<Category[]> {
    return await this.categoryService.findByName(name)
  }

  @Get(FIND_BY_ID)
  async findById(@Body('idCategory') id: number): Promise<Category> {
    return await this.categoryService.findById(id)
  }
}
