import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthGuard, BearerAuthGuard, CookieAuthGuard } from './guard';
import { UsersModule } from '@/users';
import { DbModule } from '@/database';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    DbModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (
        config: ConfigService,
      ) => ({
        secret: config.get<string>(
          'JWT_SECRET',
        ),
        signOptions: {
          algorithm: 'HS256',
          expiresIn: '30d',
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    BearerAuthGuard,
    CookieAuthGuard,
    AuthGuard,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [
    JwtModule,
    AuthService,
  ],
})
export class AuthModule {}