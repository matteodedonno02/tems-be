import { Injectable, NestMiddleware } from '@nestjs/common';
import { User } from 'src/models/user.entity';
import { TokenService } from 'src/services/token.service';

@Injectable()
export class TokenMiddleware implements NestMiddleware {

  constructor(
    private tokenService: TokenService
  ) { }

  async use(req: any, _res: Response, next: () => void) {
    const token = this.extractTokenFromHeader(req)
    if (token) {
      const user: User = await this.tokenService.decode(token)
      delete (user as any).iat
      req.userInfo = user
    }
    next()
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization'] ? request.headers['authorization'].split(' ') : []
    return type === 'Bearer' ? token : undefined
  }
}