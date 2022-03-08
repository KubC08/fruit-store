import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

import { ALLOWANON_KEY } from '../allowAnon.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const allowsAnon = this.reflector.getAllAndOverride<boolean>(ALLOWANON_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if(allowsAnon) return true;

        return super.canActivate(context);
    }
}