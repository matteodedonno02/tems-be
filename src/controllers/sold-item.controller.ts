import { Body, Controller, Get, Post } from "@nestjs/common";
import { SoldItemService } from "../services/sold-item.service";
import { SoldItem } from "../models/sold-item.entity";
import {
  SAVE_OR_UPDATE,
  DELETE,
  FIND_ALL,
  FIND_BY_ID,
  FIND_BY_DATE
} from "../util/routing-constants";


@Controller('soldItem')
export class SoldItemController {

  constructor(
    private soldItemService: SoldItemService
  ) {
  }

  @Post(SAVE_OR_UPDATE)
  async saveOrUpdate(@Body() soldItem: SoldItem) {
    return await this.soldItemService.saveOrUpdate(soldItem)
  }

  @Post(DELETE)
  async delete(@Body('idSoldItem') idSoldItem: number) {
    return await this.soldItemService.delete(idSoldItem)
  }

  @Get(FIND_ALL)
  async findAll() {
    return await this.soldItemService.findAll()
  }

  @Get(FIND_BY_DATE)
  async findByDate(@Body('date') date: Date): Promise<SoldItem[]> {
    return await this.soldItemService.findByDate(date)
  }

  @Get(FIND_BY_ID)
  async findById(@Body('idSoldItem') id: number): Promise<SoldItem> {
    return await this.soldItemService.findById(id)
  }
}
