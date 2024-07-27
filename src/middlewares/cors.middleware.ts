import { Injectable, NestMiddleware } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import * as cors from 'cors';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  private readonly options: CorsOptions

  constructor(
    private config: ConfigService
  ) {
    let whitelist = config.get('corsWhitelist')
    whitelist = Array.isArray(whitelist) ? whitelist : ['*']
    this.options = {
      origin: whitelist,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      preflightContinue: false
    }
  }

  use(req: Request, res: Response, next: () => void) {
    cors(this.options)(req, res, next)
  }
}