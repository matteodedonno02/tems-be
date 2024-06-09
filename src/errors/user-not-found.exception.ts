import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundException extends HttpException {

    private static readonly MESSAGE = 'user_not_found'

    constructor() {
        super(UserNotFoundException.MESSAGE, HttpStatus.NOT_FOUND)
    }
}