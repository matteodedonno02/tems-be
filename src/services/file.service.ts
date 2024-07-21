import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { FileNotFound } from 'src/errors/file-not-found.exception';
import { UploadFailed } from 'src/errors/upload-failed.exception';
import { File } from 'src/models/file.entity';
import { DataSource, Repository } from 'typeorm';
import { DeleteFailed } from '../errors/delete-failed.exception';

@Injectable()
export class FileService {

    private uploadPath: string;
    private fileRepo: Repository<File>;

    constructor(
      private config: ConfigService,
      private dataSource: DataSource,
    ) {
        this.uploadPath = this.config.get('uploadPath');
        this.fileRepo = dataSource.getRepository(File);
    }

    async saveFile(file: Express.Multer.File): Promise<File> {
        return await this.dataSource.transaction(async (entityManager) => {
            const savedFile = await entityManager.save(File, {
                fileName: file.originalname,
            });

            if (!fs.existsSync(this.uploadPath)) {
                fs.promises.mkdir(this.uploadPath);
            }

            let fullPath;
            try {
                fullPath = `${this.uploadPath}/${savedFile.uuid}`;
                await fs.promises.writeFile(fullPath, file.buffer);
            } catch (_ex) {
                throw new UploadFailed();
            }


            return savedFile;
        });
    }


    async deleteFile(file: File): Promise<void> {
        return await this.dataSource.transaction(async (entityManager) => {
            const foundFile = await entityManager.findBy(File, {
                uuid: file.uuid,
            });
            if (foundFile) {
                let fullPath;
                try {
                    fullPath = `${this.uploadPath}/${foundFile.at(0).uuid}`;
                    await fs.rmSync(fullPath);
                } catch (_ex) {
                    throw new DeleteFailed();
                }
            } else
                throw new FileNotFound();
        });
    }

    async getFileStream(fileUUID: string) {
        const file = await this.fileRepo.findOneBy({
            uuid: fileUUID,
        });

        if (!file) {
            throw new FileNotFound();
        }

        const fullPath = `${this.uploadPath}/${file.uuid}`;
        const stream = fs.createReadStream(fullPath);
        return stream;
    }
}
