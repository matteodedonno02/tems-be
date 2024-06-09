import { Injectable } from "@nestjs/common";
import { DataSource, DeleteResult, Repository } from "typeorm";
import { SoldItem } from "../models/sold-item.entity"

@Injectable()
export class SoldItemService {
  private soldItemRepo: Repository<SoldItem>;

  constructor(
    private dataSource: DataSource
  ) {
    this.soldItemRepo = dataSource.getRepository(SoldItem);
  }

  async saveOrUpdate(soldItem: SoldItem): Promise<SoldItem> {
    return await this.soldItemRepo.save(soldItem);
  }

  async delete(idSoldItem: number): Promise<DeleteResult> {
    return await this.soldItemRepo.delete(idSoldItem);
  }

  async findAll(): Promise<SoldItem[]> {
    return await this.soldItemRepo.find({relations: {article:true}});
  }

  async findByDate(date: Date): Promise<SoldItem[]> {
    return await this.soldItemRepo.createQueryBuilder("soldItem").where("soldItem.buyingDate =:date", { date }).getMany();
  }

  async findById(idSoldItem: number): Promise<SoldItem> {
    return await this.soldItemRepo.createQueryBuilder("soldItem").where("soldItem.idSoldItem = :idSoldItem", { idSoldItem }).getOne();
  }
}
