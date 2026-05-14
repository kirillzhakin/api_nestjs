import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BearerAuthGuard implements CanActivate {
    constructor(
        private jwt: JwtService,
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            'isPublic',
            [context.getHandler(), context.getClass()],
        );

        if (isPublic) return true;

        const req = context.switchToHttp().getRequest();

        const authHeader = req.headers.authorization;
        if (!authHeader) throw new UnauthorizedException();

        const [type, token] = authHeader.split(' ');

        if (type !== 'Bearer') {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwt.verifyAsync(token);
            req.actor = payload;
            return true;
        } catch (e) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}