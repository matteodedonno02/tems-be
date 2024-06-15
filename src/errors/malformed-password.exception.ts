import { HttpException, HttpStatus } from "@nestjs/common";

export class MalformedPassword extends HttpException {

    private static readonly MESSAGE = 'malformed_password'

    constructor() {
        super(MalformedPassword.MESSAGE, HttpStatus.BAD_REQUEST)
    }
}