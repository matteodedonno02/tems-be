import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from 'src/errors/user-not-found.exception';
import { User } from 'src/models/user.entity';
import { DataSource, Repository } from 'typeorm';
import { TokenService } from './token.service';

@Injectable()
export class UsersService {

    private userRepo: Repository<User>

    constructor(
        private dataSource: DataSource,
        private tokenService: TokenService
    ) {
        this.userRepo = dataSource.getRepository(User)
    }

    async login(username: string, password: string) {
        const finded: User = await this.userRepo.createQueryBuilder()
            .where('username = :username', { username })
            .andWhere('password = SHA2(:password, 512)', { password })
            .getOne()

        if (!finded) {
            throw new UserNotFoundException()
        }

        return await this.tokenService.encode({ ...finded })
    }
}
