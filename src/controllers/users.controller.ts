import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {
    }

    @Post('')
    async login(@Body('username') username: string, @Body('password') password: string): Promise<{token: string, shopExists: boolean}>  {
        return await this.usersService.login(username, password)
    }
}
