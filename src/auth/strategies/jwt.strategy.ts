import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { JWTPayload } from '../jwt.payload';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('jwtSecret')
        });
    }

    // We just return the payload for now, but in a real app we would
    // get the user info from the database/cache
    async validate(payload: JWTPayload): Promise<JWTPayload> {
        return payload;
        /*return {
            username: payload.username,
            email: payload.email,
            roles: payload.roles
        }*/
    }
}