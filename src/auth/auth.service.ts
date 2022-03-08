import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { JWTPayload } from './jwt.payload';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<User | null> {
        const user = await this.usersService.findByUsernameInternal(username);
        
        if(user && await bcrypt.compare(password, user.password))
            return user;
        return null;
    }

    async login(user: User) {
        const payload: JWTPayload = {
            id: user['_id'], // Gotten from the database
            username: user.username,
            email: user.email,
            roles: user.roles
        }

        return { access_token: this.jwtService.sign(payload) }
    }
}
