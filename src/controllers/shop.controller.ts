import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ShopService } from 'src/services/shop.service';
import { AUTH } from 'src/util/routing-constants';

@Controller('shop')
export class ShopController {

    constructor(
        private shopService: ShopService
    ) { }

    @Post(`${AUTH}/configure`)
    @UseInterceptors(FileInterceptor('file'))
    async saveConfiguration(@UploadedFile() file: Express.Multer.File, @Body() body) {
        const json = JSON.parse(body.json)
        return await this.shopService.saveShop(file, json.shopName)
    }
}
