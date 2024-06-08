import { Controller, Get } from '@nestjs/common';
import { User } from 'src/models/user.entity';
import { DataSource, Repository } from 'typeorm';

@Controller('users')
export class UsersController {
    private userRepo: Repository<User>
    constructor(
        private dataSource: DataSource
    ) {
        this.userRepo = dataSource.getRepository(User)
    }

    @Get('/')
    test() {
        const user: User = {
            username: 'admin',
            password: 'admin'
        }
        this.userRepo.save(user)
        return { msg: 'it works' }
    }
}
