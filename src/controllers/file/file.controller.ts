import { Controller, Get, Param, Res } from '@nestjs/common';
import { FileService } from 'src/services/file.service';

@Controller('file')
export class FileController {

    constructor(
        private fileService: FileService
    ) {}


    @Get(':uuid')
    async getFileStream(@Param('uuid') fileUUID: string, @Res() res) {
        const stream = await this.fileService.getFileStream(fileUUID)
        stream.pipe(res)
    }
}
