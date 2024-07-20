import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/services/file.service';

@Controller('file')
export class FileController {

    constructor(
        private fileService: FileService
    ) { }

    @Get(':uuid')
    async getFileStream(@Param('uuid') fileUUID: string, @Res() res) {
        const stream = await this.fileService.getFileStream(fileUUID)
        stream.pipe(res)
    }

    // ONLY FOR TESTING. REMOVE THIS SHIT!!!
    @Post(``)
    @UseInterceptors(FileInterceptor('file'))
    async saveConfiguration(@UploadedFile() file: Express.Multer.File) {
        return await this.fileService.saveFile(file)
    }
}
