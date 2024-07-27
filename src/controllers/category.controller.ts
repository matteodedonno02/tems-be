import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CategoryService } from "../services/category.service";
import { Category } from "../models/category.entity";

import {
  AUTH,
  DELETE,
  FIND_ALL,
  FIND_BY_ID,
  FIND_BY_NAME,
  FIND_ENABLED,
  GET_PAGED,
  SAVE_OR_UPDATE,
} from '../util/routing-constants';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('category')
export class CategoryController {

  constructor(
    private categoryService: CategoryService,
  ) { }

  @Post(`${AUTH}/${SAVE_OR_UPDATE}`)
  @UseInterceptors(FileInterceptor('file'))
  async saveOrUpdate(@UploadedFile() file: Express.Multer.File, @Body() category: Category) {
    return await this.categoryService.saveOrUpdate(file, category);
  }

  @Delete(`${AUTH}/${DELETE}`)
  async delete(@Body('idCategory') idCategory: number) {
    return await this.categoryService.delete(idCategory);
  }

  @Get(FIND_ALL)
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get(FIND_ENABLED)
  async findEnabled() {
    return await this.categoryService.findEnabled();
  }

  @Get(FIND_BY_NAME)
  async findByName(@Body('name') name: string): Promise<Category[]> {
    return await this.categoryService.findByName(name);
  }

  @Get(FIND_BY_ID)
  async findById(@Body('idCategory') id: number): Promise<Category> {
    return await this.categoryService.findById(id);
  }

  @Get(`${AUTH}/${GET_PAGED}`)
  async getPaged(@Param('skip') skip: number, @Param('limit') limit: number, @Query('searchTerms') searchTerms?: string) {
    return await this.categoryService.getPaged(skip, limit, searchTerms)
  }
}
