import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SoldItem } from "../models/sold-item.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SoldItem])],
  exports: [TypeOrmModule]
})
export class SoldItemModule {}
