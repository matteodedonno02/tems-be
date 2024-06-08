import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundException extends HttpException {
    constructor() {
        super('user_not_found', HttpStatus.NOT_FOUND)
    }
}