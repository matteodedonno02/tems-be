import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { FileNotFound } from 'src/errors/file-not-found.exception';
import { UploadFailed } from 'src/errors/upload-failed.exception';
import { File } from 'src/models/file.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class FileService {
    
    private uploadPath: string
    private fileRepo: Repository<File>

    constructor(
        private config: ConfigService,
        private dataSource: DataSource
    ) {
        this.uploadPath = this.config.get('uploadPath')
        this.fileRepo = dataSource.getRepository(File)
    }
    
    async saveFile(file: Express.Multer.File): Promise<File> {
        return await this.dataSource.transaction(async (entityManager) => {
            const savedFile = await entityManager.save(File, {
                fileName: file.originalname
            })
    
            let fullPath
            try {
                fullPath = `${this.uploadPath}/${savedFile.uuid}`
                await fs.promises.writeFile(fullPath, file.buffer)
            } catch(_ex) {
                throw new UploadFailed()
            }
    
            
            return savedFile
        })
    }

    async getFileStream(fileUUID: string) {
        const file = await this.fileRepo.findOneBy({
            uuid: fileUUID
        })
        
        if(!file) {
            throw new FileNotFound()
        }

        const fullPath = `${this.uploadPath}/${file.uuid}`
        const stream = fs.createReadStream(fullPath)
        return stream
    }
}
