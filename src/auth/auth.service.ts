import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../users";

@Injectable()
export class AuthService {
    constructor(
        private users: UsersRepository,
    ) { }

    async authenticate(
        accessToken: string,
        refreshToken: string,
    ) {
        if (accessToken) {
            const user =
                await this.users.getByAccessToken(
                    accessToken,
                );
            if (user) return user;
        }

        if (refreshToken) {
            const user =
                await this.users.getByRefreshToken(
                    refreshToken,
                );
            if (user) return user;
        }

        return null;
    }
}