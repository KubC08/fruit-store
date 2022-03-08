import { Controller, UseGuards, Request, Post, Logger, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AllowAnon } from './allowAnon.decorator';
import { RegisterDto } from './dto';
import { Role } from '../roles';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) {}

    @UseGuards(AuthGuard('local'))
    @AllowAnon()
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @AllowAnon()
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        await this.usersService.createUser({
            username: registerDto.username,
            email: registerDto.email,
            password: registerDto.password,
            roles: [ Role.User ]
        });
    }
}
