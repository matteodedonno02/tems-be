import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from 'src/models/shop.entyty';

@Module({
    imports: [TypeOrmModule.forFeature([Shop])],
    exports: [TypeOrmModule]
  })
export class ShopModule {}
