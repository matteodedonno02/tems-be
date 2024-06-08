import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { User } from 'src/models/user.entity';
import { UsersService } from 'src/services/users.service';
import { UserInfo } from 'src/util/user-info.decorator';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {
    }

    @Post('')
    async login(@Body('username') username: string, @Body('password') password: string): Promise<{token: string}>  {
        return {
            token: await this.usersService.login(username, password)
        }
    }
}
