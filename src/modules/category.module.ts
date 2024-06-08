import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../models/category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Category]), ],
  exports: [TypeOrmModule]
})
export class CategoryModule {}
