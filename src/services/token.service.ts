import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/user.entity';

@Injectable()
export class TokenService {

    constructor(
        private jwtService: JwtService
    ) { }

    async encode(user: User) {
        return await this.jwtService.signAsync(user)
    }

    async decode(token: string) {
        return await this.jwtService.verifyAsync(token)
    }
}
