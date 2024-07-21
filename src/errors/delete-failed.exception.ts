import { HttpException, HttpStatus } from '@nestjs/common';

export class DeleteFailed extends HttpException {

  private static readonly MESSAGE = 'delete_failed';

  constructor() {
    super(DeleteFailed.MESSAGE, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}