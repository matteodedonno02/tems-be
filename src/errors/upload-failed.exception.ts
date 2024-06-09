import { HttpException, HttpStatus } from "@nestjs/common";

export class UploadFailed extends HttpException {

    private static readonly MESSAGE = 'upload_failed'

    constructor() {
        super(UploadFailed.MESSAGE, HttpStatus.INTERNAL_SERVER_ERROR)
    }
}