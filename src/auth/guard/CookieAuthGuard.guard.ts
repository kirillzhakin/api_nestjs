import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class CookieAuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {

        const req = context
            .switchToHttp()
            .getRequest<Request>();

        const res = context
            .switchToHttp()
            .getResponse<Response>();
            
        console.log('cookies:', req.cookies)
        const accessToken =
            req.cookies?.access_token;

        const refreshToken =
            req.cookies?.refresh_token;

        const user =
            await this.authService.authenticate(
                accessToken,
                refreshToken,
            );

        if (!user) {
            throw new UnauthorizedException(
                'Неправильные данные аутентификации',
            );
        }

        // req.user = {
        //     id: user.id,
        //     role: user.role,
        //     access: user.allowedTypes,
        // };

        // if ('access_token' in user) {
        //     res.cookie(
        //         'access_token',
        //         user.access_token,
        //         {
        //             expires:
        //                 user.access_token_expires_in,

        //             httpOnly: true,
        //         },
        //     );

        //     res.cookie(
        //         'refresh_token',
        //         user.refresh_token,
        //         {
        //             expires:
        //                 user.refresh_token_expires_in,

        //             httpOnly: true,
        //         },
        //     );
        // }

        return true;
    }
}