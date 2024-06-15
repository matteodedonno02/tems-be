import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Shop } from 'src/models/shop.entyty';
import { ShopService } from 'src/services/shop.service';
import { AUTH } from 'src/util/routing-constants';

@Controller('shop')
export class ShopController {

    constructor(
        private shopService: ShopService
    ) { }

    @Get()
    async getShop(): Promise<Shop> {
        return await this.shopService.getShop()
    }

    @Post(`${AUTH}/configure`)
    @UseInterceptors(FileInterceptor('file'))
    async saveConfiguration(@UploadedFile() file: Express.Multer.File, @Body() body) {
        const json = JSON.parse(body.json)
        return await this.shopService.saveShop(file, json.shopName)
    }
}
