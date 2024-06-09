import { HttpException, HttpStatus } from "@nestjs/common";

export class FileNotFound extends HttpException {

    private static readonly MESSAGE = 'file_not_found'

    constructor() {
        super(FileNotFound.MESSAGE, HttpStatus.NOT_FOUND)
    }
}