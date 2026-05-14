import { Injectable } from '@nestjs/common';
import { DbService } from '../../database';


export interface ISettOutputRow {
  OID: number
  OPNAME: string
  OPVAL: string
}

export interface IGenSett {
  id: number
  name: string
  value: string
}

@Injectable()
export class ServerService {
  constructor(private db: DbService) { }

  async getGeneralSettingsFromDB(): Promise<IGenSett[]> {
    const result = await this.db.queryProc<ISettOutputRow>(
      'READ_PARAMS',
    );
    return result.map((item) => ({
      id: item.OID,
      name: item.OPNAME,
      value: item.OPVAL,
    }));
  }
}