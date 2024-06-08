import { Injectable, NestMiddleware } from '@nestjs/common';
import { Unauthorized } from 'src/errors/unauthorized.exception';

@Injectable()
export class IsLoggedMiddleware implements NestMiddleware {
  use(req: any, _res: Response, next: () => void) {
    if (!req.userInfo) {
      throw new Unauthorized()
    }
    next();
  }
}
