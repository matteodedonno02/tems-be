import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from 'src/errors/user-not-found.exception';
import { User } from 'src/models/user.entity';
import { DataSource, Repository } from 'typeorm';
import { TokenService } from './token.service';
import { Shop } from 'src/models/shop.entyty';
import { ShopService } from './shop.service';
import { sha512 } from 'src/util/sha512';
import { MalformedPassword } from 'src/errors/malformed-password.exception';

@Injectable()
export class UsersService {

    private userRepo: Repository<User>

    constructor(
        private dataSource: DataSource,
        private tokenService: TokenService,
        private shopService: ShopService
    ) {
        this.userRepo = dataSource.getRepository(User)
    }

    async createDefaultSuperAdmin() {
        const superAdmin = await this.userRepo.findOneBy({
            username: 'admin'
        })
        if (!superAdmin) {
            await this.userRepo.save({
                username: 'admin',
                password: sha512('admin'),
                role: 'superadmin'
            })
        }
    }

    async login(username: string, password: string) {
        const finded: User = await this.userRepo.createQueryBuilder()
            .where('username = :username', { username })
            .andWhere('password = SHA2(:password, 512)', { password })
            .getOne()

        if (!finded) {
            throw new UserNotFoundException()
        }

        const shop: Shop = await this.shopService.getShop()

        return {
            token: await this.tokenService.encode({ ...finded }),
            role: finded.role,
            shopExists: !!shop
        }
    }

    async changePassword(idUser: number, newPassword: string) {
        if (!this.checkPassword(newPassword)) {
            throw new MalformedPassword()
        }

        return await this.userRepo.createQueryBuilder()
            .update()
            .set({ password: sha512(newPassword) })
            .where({ idUser })
            .execute()
    }

    private checkPassword(password: string) {
        const regex = /^(?=.*[A-Z])(?=.*\d).+$/
        return password.length >= 8 && regex.test(password)
    }
}

