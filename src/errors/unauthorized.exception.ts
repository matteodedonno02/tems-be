import { HttpException, HttpStatus } from "@nestjs/common";

export class Unauthorized extends HttpException {

    private static readonly MESSAGE = 'unauthorized'

    constructor() {
        super(Unauthorized.MESSAGE, HttpStatus.UNAUTHORIZED)
    }
}