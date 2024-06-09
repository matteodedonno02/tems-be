import { Injectable } from '@nestjs/common';
import { File } from 'src/models/file.entity';
import { Shop } from 'src/models/shop.entyty';
import { DataSource, Repository } from 'typeorm';
import { FileService } from './file.service';

@Injectable()
export class ShopService {
    
    private shopRepo: Repository<Shop>
    private fileRepo: Repository<File>
    
    constructor(
        private dataSource: DataSource,
        private fileService: FileService
    ) {
        this.shopRepo = dataSource.getRepository(Shop)
        this.fileRepo = dataSource.getRepository(File)
    }

    async getShop(): Promise<Shop> {
        return await this.shopRepo.createQueryBuilder().getOne()
    }

    async saveShop(file: Express.Multer.File, shopName: string) {
        const savedFile: File = await this.fileService.saveFile(file)
        return await this.shopRepo.save({
            shopName,
            logoFile: savedFile
        })
    }
}
