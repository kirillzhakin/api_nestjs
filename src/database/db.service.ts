import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DbService {
  private readonly pool: Pool;

  constructor(private readonly config: ConfigService) {
    this.pool = new Pool({
      user: this.config.get<string>('POSTGRES_USER') || 'serv_user',
      password: this.config.get<string>('POSTGRES_PASSWORD') || 'server-stability-achievement',
      host: this.config.get<string>('POSTGRES_HOST') || '127.0.0.1',
      port: this.config.get<number>('POSTGRES_PORT') || 47700,
      database: this.config.get<string>('POSTGRES_DB') || 'HIST',
    });
  }

  async queryProc<T>(procName: string, params: any[] = []): Promise<T[]> {
    const placeholders = params.map((_, i) => `$${i + 1}`).join(', ');

    const sql = `SELECT * FROM ${procName}(${placeholders})`;

    const result = await this.pool.query(sql, params);
    return result.rows;
  }

  async execProc(procName: string, params: any[] = []): Promise<void> {
    const placeholders = params.map((_, i) => `$${i + 1}`).join(', ');
    const sql = `CALL ${procName}(${placeholders})`;

    await this.pool.query(sql, params);
  }
}