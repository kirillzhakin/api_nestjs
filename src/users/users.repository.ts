import { DbService } from "@/database";
import { Injectable } from "@nestjs/common";
import { IControlLoginOutputRow } from "./users.types";

@Injectable()
export class UsersRepository {
    constructor(private db: DbService) { }

    async getByAccessToken(token: string): Promise<IControlLoginOutputRow | null> {
        const res = await this.db.queryProc<IControlLoginOutputRow>(
            'CONTROL_ACCESS_TOKEN',
            [token],
        );
        return res[0]?.OID ? res[0] : null;
    }

    async getByRefreshToken(token: string): Promise<IControlLoginOutputRow | null> {
        const res = await this.db.queryProc<IControlLoginOutputRow>(
            'CONTROL_REFRESH_TOKEN',
            [token],
        );
        return res[0]?.OID? res[0] : null;
    }
}