import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { BearerAuthGuard } from "./BearerAuthGuard.guard";
import { CookieAuthGuard } from "./CookieAuthGuard.guard";
import { Request } from 'express';

@Injectable()
export class AuthGuard
  implements CanActivate
{
  constructor(
    private bearerGuard: BearerAuthGuard,
    private cookieGuard: CookieAuthGuard,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const req = context
      .switchToHttp()
      .getRequest<Request>();

    const authHeader =
      req.headers.authorization;
    console.log('authHeader:', authHeader)
    if (authHeader) {
      return this.bearerGuard.canActivate(
        context,
      );
    }
    return this.cookieGuard.canActivate(
      context,
    );
  }
}